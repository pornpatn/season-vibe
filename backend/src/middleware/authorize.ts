import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

export function authorize(module: string, action: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user?.roleId) return res.status(401).json({ message: 'Unauthorized' });

    const hasPermission = await prisma.permission.findFirst({
      where: {
        roleId: user.roleId,
        module,
        action,
      },
    });

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }

    next();
  };
}