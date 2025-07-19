import prisma from '../../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function updateLastAccess(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { lastAccessAt: new Date() },
  });
}

function generateTokens(userId: string, roleName: string) {
  const accessToken = jwt.sign(
    { userId, role: roleName },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '90d' }
  );

  return { accessToken, refreshToken };
}

export async function authenticateUser(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { role: true }
  });
  if (!user || !user.isActive) return null;

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return null;

  await updateLastAccess(user.id);
  const tokens = generateTokens(user.id, user.role.name);

  const { passwordHash, ...safeUser } = user;

  return {
    ...tokens,
    user: safeUser,
  };
}

export async function refreshUserToken(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: true }
  });
  if (!user || !user.isActive) return null;

  await updateLastAccess(user.id);
  const tokens = generateTokens(user.id, user.role.name);

  const { passwordHash, ...safeUser } = user;

  return {
    ...tokens,
    user: safeUser,
  };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: true }
  });
  if (!user || !user.isActive) return null;

  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export async function changeUserPassword(userId: string, oldPassword: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.isActive) return 'not_found';

  const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!isMatch) return 'invalid';

  const newHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash: newHash,
      isTemporaryPassword: false,
    },
  });

  return 'success';
}

export async function resetUserPassword(roleId: string, userId: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.isActive) return 'not_found';

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash,
      isTemporaryPassword: true
    }
  });

  return 'success';
}