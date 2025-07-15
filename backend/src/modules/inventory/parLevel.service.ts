import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getParLevelsByItem = async (inventoryItemId: string) => {
  return prisma.parLevel.findMany({
    where: { inventoryItemId },
    orderBy: { dayOfWeek: 'asc' },
  });
};

export const setParLevel = async (data: any) => {
  return prisma.parLevel.upsert({
    where: {
      inventoryItemId_dayOfWeek: {
        inventoryItemId: data.inventoryItemId,
        dayOfWeek: data.dayOfWeek,
      },
    },
    update: { amount: data.amount },
    create: data,
  });
};

export const deleteParLevel = async (inventoryItemId: string, dayOfWeek: number) => {
  return prisma.parLevel.delete({
    where: {
      inventoryItemId_dayOfWeek: { inventoryItemId, dayOfWeek },
    },
  });
};
