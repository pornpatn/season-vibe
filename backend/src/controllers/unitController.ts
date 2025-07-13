import { Request, Response } from 'express'
import { prisma } from '../prisma';

export const getUnits = async (req: Request, res: Response) => {
  const units = await prisma.unit.findMany({
    orderBy: { name: 'asc' },
  })
  res.json(units)
}