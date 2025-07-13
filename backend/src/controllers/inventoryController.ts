import { Request, Response } from 'express'
import { prisma } from '../prisma';

const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const reverseDayMap = dayMap.reduce((acc, day, index) => {
  acc[day] = index
  return acc
}, {} as Record<string, number>)

const formatParLevels = (parLevels: { dayOfWeek: number; parLevel: number }[]) => {
  const map: Record<string, number> = {}
  for (const level of parLevels) {
    const dayKey = dayMap[level.dayOfWeek]
    if (dayKey) {
      map[dayKey] = level.parLevel
    }
  }
  return map
}

export const getInventoryItems = async (req: Request, res: Response) => {
  const { categoryId, search } = req.query

  const where: any = { deletedAt: null }

  if (categoryId) where.categoryId = categoryId
  if (search) {
    const q = String(search).toLowerCase()
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { alternateNames: { contains: q, mode: 'insensitive' } },
    ]
  }

  const items = await prisma.inventoryItem.findMany({
    where,
    include: {
      category: true,
      parLevels: true,
    },
    orderBy: { displayOrder: 'asc' },
  })

  const formatted = items.map((item) => ({
    id: item.id,
    name: item.name,
    alternateNames: item.alternateNames,
    description: item.description,
    note: item.note,
    categoryId: item.categoryId,
    categoryName: item.category?.name ?? '',
    isActive: item.isActive,
    displayOrder: item.displayOrder,
    categoryDisplayOrder: item.category?.displayOrder ?? 9999,
    parLevels: formatParLevels(item.parLevels),
  }))

  res.json(formatted)
}

export const getInventoryItemById = async (req: Request, res: Response) => {
  const { id } = req.params

  const item = await prisma.inventoryItem.findUnique({
    where: { id },
    include: {
      category: true,
      parLevels: true,
    },
  })

  if (!item || item.deletedAt) return res.status(404).json({ error: 'Not found' })

  res.json({
    id: item.id,
    name: item.name,
    alternateNames: item.alternateNames,
    description: item.description,
    note: item.note,
    categoryId: item.categoryId,
    categoryName: item.category?.name ?? '',
    isActive: item.isActive,
    displayOrder: item.displayOrder,
    parLevels: formatParLevels(item.parLevels),
  })
}

export const createInventoryItem = async (req: Request, res: Response) => {
  const { name, categoryId, unitId, isActive, displayOrder, alternateNames, description, note, parLevels = {} } = req.body

  const item = await prisma.inventoryItem.create({
    data: {
      name,
      categoryId,
      unitId,
      isActive: isActive ?? true,
      displayOrder: displayOrder ?? 0,
      alternateNames,
      description,
      note,
      parLevels: {
        create: Object.entries(parLevels as Record<string, number>).map(([day, level]: [string, number]) => ({
          dayOfWeek: reverseDayMap[day],
          parLevel: level,
        })),
      },
    },
  })

  res.status(201).json({ id: item.id })
}

export const updateInventoryItem = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, categoryId, unitId, isActive, displayOrder, alternateNames, description, note, parLevels = {} } = req.body

  await prisma.inventoryItem.update({
    where: { id },
    data: {
      name,
      categoryId,
      unitId,
      isActive,
      displayOrder,
      alternateNames,
      description,
      note,
    },
  })

  await prisma.inventoryParLevel.deleteMany({ where: { inventoryItemId: id } })

  await prisma.inventoryParLevel.createMany({
    data: Object.entries(parLevels).map(([day, level]) => ({
      inventoryItemId: id,
      dayOfWeek: reverseDayMap[day],
      parLevel: level as number, // <— fix
    })),
  })

  res.json({ success: true })
}

export const deleteInventoryItem = async (req: Request, res: Response) => {
  const { id } = req.params
  await prisma.inventoryItem.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
  res.json({ success: true })
}

export const reorderInventoryItems = async (req: Request, res: Response) => {
  const { items } = req.body as { items: { id: string, displayOrder: number }[] }

  const updateOps = items.map(item =>
    prisma.inventoryItem.update({
      where: { id: item.id },
      data: { displayOrder: item.displayOrder },
    })
  )

  await Promise.all(updateOps)
  res.json({ success: true })
}