import { Request, Response } from 'express';
import * as userService from './user.service';

export async function listUsers(req: Request, res: Response) {
  const users = await userService.listUsers();
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
}

export async function updateUser(req: Request, res: Response) {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  await userService.deleteUser(req.params.id);
  res.status(204).end();
}

export async function changeUserStatus(req: Request, res: Response) {
  const user = await userService.changeUserStatus(req.params.id, req.body.isActive);
  res.json(user);
}