import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      userId: string;
      role: string;
    };

    (req as any).user = {
      userId: decoded.userId,
      roleName: decoded.role // if you also store roleId, you can decode that here too
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}
