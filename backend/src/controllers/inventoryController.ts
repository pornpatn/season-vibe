import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const getInventoryItems = async (req: Request, res: Response) => {
  const { categoryId, search } = req.query;

  const where: any = {};

  if (categoryId) where.categoryId = categoryId;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      {
        alternateNames: {
          some: {
            name: { contains: search, mode: 'insensitive' }
          }
        }
      }
    ];
  }

  const items = await prisma.inventoryItem.findMany({
    where,
    include: { unit: true, category: true, alternateNames: true },
    orderBy: { displayOrder: 'asc' }
  });

  const formatted = items.map((item) => ({
    id: item.id,
    name: item.name,
    alternateNames: item.alternateNames?.map((n) => n.name) || [],
    categoryId: item.categoryId,
    categoryName: item.category?.name ?? '',
    isActive: item.isActive,
    parLevels: item.parLevels || {},
  }))

  res.json(formatted)
};

export const createInventoryItem = async (req: Request, res: Response) => {
  try {
    const { name, unit, category, displayOrder, isActive, alternateNames } = req.body;

    if (!name || !unit?.name || !category?.name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await prisma.inventoryItem.findUnique({ where: { name } });
    if (existing) {
      return res.status(409).json({ message: 'Inventory item already exists' });
    }

    const item = await prisma.inventoryItem.create({
      data: {
        name,
        displayOrder: displayOrder ?? null,
        isActive: isActive ?? true,
        unit: {
          connectOrCreate: {
            where: { name: unit.name },
            create: { name: unit.name }
          }
        },
        category: {
          connectOrCreate: {
            where: { name: category.name },
            create: { name: category.name }
          }
        }
      }
    });

    if (Array.isArray(alternateNames)) {
      for (const altName of alternateNames) {
        await prisma.inventoryAlternateName.create({
          data: {
            name: altName,
            inventoryItemId: item.id
          }
        });
      }
    }

    const itemWithRelations = await prisma.inventoryItem.findUnique({
      where: { id: item.id },
      include: { unit: true, category: true, alternateNames: true }
    });

    res.status(201).json(itemWithRelations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating inventory item' });
  }
};

export const getInventoryItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await prisma.inventoryItem.findUnique({
    where: { id },
    include: { unit: true, category: true, alternateNames: true }
  });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, unit, category, displayOrder, isActive, alternateNames } = req.body;

  const item = await prisma.inventoryItem.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: 'Not found' });

  const updated = await prisma.inventoryItem.update({
    where: { id },
    data: {
      name: name ?? item.name,
      displayOrder,
      isActive,
      unit: unit?.name ? {
        connectOrCreate: {
          where: { name: unit.name },
          create: { name: unit.name }
        }
      } : undefined,
      category: category?.name ? {
        connectOrCreate: {
          where: { name: category.name },
          create: { name: category.name }
        }
      } : undefined
    }
  });

  if (Array.isArray(alternateNames)) {
    await prisma.inventoryAlternateName.deleteMany({ where: { inventoryItemId: id } });
    for (const name of alternateNames) {
      await prisma.inventoryAlternateName.create({
        data: { name, inventoryItemId: id }
      });
    }
  }

  const itemWithRelations = await prisma.inventoryItem.findUnique({
    where: { id },
    include: { unit: true, category: true, alternateNames: true }
  });

  res.json(itemWithRelations);
};

export const deleteInventoryItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await prisma.inventoryItem.update({
    where: { id },
    data: { isActive: false }
  });
  res.json({ message: 'Item marked as inactive', item });
};