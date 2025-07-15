import { CookieOptions, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  authenticateUser,
  refreshUserToken,
  getCurrentUser,
  changeUserPassword,
  resetUserPassword,
} from './auth.service';

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const result = await authenticateUser(username, password);
  if (!result) return res.status(401).json({ message: 'Invalid credentials' });

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: process.env.COOKIE_SAMESITE || 'strict',
  } as CookieOptions);

  res.json({ accessToken: result.accessToken, user: result.user });
}

export function logout(req: Request, res: Response) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: process.env.COOKIE_SAMESITE || 'strict',
  } as CookieOptions);

  res.json({ message: 'Logged out' });
};

export async function refreshToken(req: Request, res: Response) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string };
    const result = await refreshUserToken(payload.userId);

    if (!result) return res.status(403).json({ message: 'Unable to refresh token' });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: process.env.COOKIE_SAMESITE || 'strict',
    } as CookieOptions);

    res.json({ accessToken: result.accessToken, user: result.user });
  } catch {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};

export async function changePassword(req: Request, res: Response) {
  const userId = (req as any).user?.userId;
  const { oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const result = await changeUserPassword(userId, oldPassword, newPassword);

  if (result === 'not_found') {
    return res.status(404).json({ message: 'User not found' });
  } else if (result === 'invalid') {
    return res.status(403).json({ message: 'Old password is incorrect' });
  }

  res.json({ message: 'Password changed successfully' });
};

export async function resetPassword(req: Request, res: Response) {
  const currentUser = (req as any).user;
  if (!currentUser) return res.status(401).json({ message: 'Unauthorized' });

  const { userId, newPassword } = req.body;
  if (!userId || !newPassword) return res.status(400).json({ message: 'Missing userId or newPassword' });

  const result = await resetUserPassword(currentUser.roleId, userId, newPassword);
  if (result === 'not_found') return res.status(404).json({ message: 'User not found' });

  res.json({ message: 'Password reset successfully' });
};

export async function getMe(req: Request, res: Response) {
  const userId = (req as any).user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const user = await getCurrentUser(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user);
};
