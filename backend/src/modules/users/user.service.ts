import bcrypt from 'bcrypt';
import prisma from '../../prisma';

export function listUsers() {
  return prisma.user.findMany({ include: { role: true } });
}

export function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id }, include: { role: true } });
}

export async function createUser(data: any) {
  const passwordHash = await bcrypt.hash(data.password, 10);
  delete data.password;
  return prisma.user.create({
    data: {
      ...data,
      passwordHash,
    },
  });
}

export async function updateUser(id: string, data: any) {
  const updateData: any = { ...data };

  if (data.password) {
    updateData.passwordHash = await bcrypt.hash(data.password, 10);
    delete updateData.password;
  }

  return prisma.user.update({ where: { id }, data: updateData });
}

export function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}

export function changeUserStatus(id: string, isActive: boolean) {
  return prisma.user.update({ where: { id }, data: { isActive } });
}