import prisma from '../../lib/prisma';

export const getAllInventoryItems = async () => {
  return prisma.inventoryItem.findMany({
    include: {
      category: true,
      unit: true,
      inventoryPrepForms: true,
      inventoryLocationItems: true,
    },
    orderBy: {
      displayOrder: 'asc',
    },
  });
};

export const getInventoryItemById = async (id: string) => {
  return prisma.inventoryItem.findUnique({
    where: { id },
    include: {
      category: true,
      unit: true,
      inventoryPrepForms: true,
      inventoryLocationItems: true,
    },
  });
};

export const createInventoryItem = async (data: any) => {
  return prisma.inventoryItem.create({
    data,
  });
};

export const updateInventoryItem = async (id: string, data: any) => {
  return prisma.inventoryItem.update({
    where: { id },
    data,
  });
};

export const deleteInventoryItem = async (id: string) => {
  return prisma.inventoryItem.delete({
    where: { id },
  });
};
