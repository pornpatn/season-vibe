import { Request, Response } from 'express'
import { prisma } from '../utils/prisma';

export const getInventoryCategories = async (req: Request, res: Response) => {
  const categories = await prisma.inventoryCategory.findMany({
    orderBy: { displayOrder: 'asc' },
  })
  res.json(categories)
}
