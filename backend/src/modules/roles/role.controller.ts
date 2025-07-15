import { Request, Response } from 'express';
import * as roleService from './role.service';

export async function listRoles(req: Request, res: Response) {
  const roles = await roleService.listRoles();
  res.json(roles);
}

export async function getRoleById(req: Request, res: Response) {
  const role = await roleService.getRoleById(req.params.id);
  if (!role) return res.status(404).json({ message: 'Role not found' });
  res.json(role);
}

export async function createRole(req: Request, res: Response) {
  const role = await roleService.createRole(req.body);
  res.status(201).json(role);
}

export async function updateRole(req: Request, res: Response) {
  const role = await roleService.updateRole(req.params.id, req.body);
  res.json(role);
}

export async function deleteRole(req: Request, res: Response) {
  await roleService.deleteRole(req.params.id);
  res.status(204).end();
}
