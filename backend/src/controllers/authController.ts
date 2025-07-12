import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma';
import { Roles } from '../constants/roles';

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username }, include: { role: true } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = { userId: user.id, role: user.role.name };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '90d' });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: (process.env.COOKIE_SAMESITE || 'lax') as 'lax' | 'strict' | 'none',
    maxAge: 90 * 24 * 60 * 60 * 1000
  });

  res.json({
    accessToken,
    user: {
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      isTemporaryPassword: user.isTemporaryPassword,
    }
  });
};

export const logout = (_req: Request, res: Response) => {
  // Stateless logout - just instruct client to delete token
  res.json({ message: 'Logged out' });
};

export const refreshToken = (req: any, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.sendStatus(401);
  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as any;
    const newAccessToken = jwt.sign({ userId: payload.userId, role: payload.role }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  } catch {
    res.sendStatus(403);
  }
};

export const changePassword = async (req: any, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return res.status(400).json({ message: 'Current password incorrect' });
  }
  const password = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { password } });
  res.json({ message: 'Password changed' });
};

export const resetPassword = async (req: any, res: Response) => {
  if (!req.user || req.user.role !== Roles.ADMIN) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const { username, newPassword } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const password = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { password } });
  res.json({ message: 'Password reset' });
};


export const getMe = async (req: any, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    include: { role: true }
  });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({
    user: {
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      isTemporaryPassword: user.isTemporaryPassword,
    }
  });
};