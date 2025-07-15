import { Request, Response } from 'express';
import * as permissionService from './permission.service';

export async function listPermissions(req: Request, res: Response) {
  const permissions = await permissionService.listPermissions();
  res.json(permissions);
}

export async function getPermissionById(req: Request, res: Response) {
  const permission = await permissionService.getPermissionById(req.params.id);
  if (!permission) return res.status(404).json({ message: 'Permission not found' });
  res.json(permission);
}

export async function createPermission(req: Request, res: Response) {
  const permission = await permissionService.createPermission(req.body);
  res.status(201).json(permission);
}

export async function deletePermission(req: Request, res: Response) {
  await permissionService.deletePermission(req.params.id);
  res.status(204).end();
}

export async function listPermissionsByRole(req: Request, res: Response) {
  const permissions = await permissionService.listPermissionsByRole(req.params.roleId);
  res.json(permissions);
}

export async function updateRolePermissions(req: Request, res: Response) {
  await permissionService.updateRolePermissions(req.params.roleId, req.body);
  res.status(204).end();
}