import { prisma } from '../utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authenticateUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '1d'
  });

  return token;
};