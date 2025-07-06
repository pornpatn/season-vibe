import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { role: true } });
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, roleId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      roleId,
    },
  });
  res.status(201).json(user);
};