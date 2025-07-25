import prisma from '../../lib/prisma';

export async function getParLevels({ itemId, locationId }: { itemId?: string; locationId?: string }) {
  return prisma.inventoryParLevel.findMany({
    where: {
      inventoryLocationItem: {
        inventoryItemId: itemId,
        locationId: locationId,
      },
    },
    include: {
      inventoryLocationItem: true,
    },
  });
}

export async function setParLevels(itemLocationId: string, parLevels: { dayOfWeek: number; amount: number }[]) {
  await prisma.inventoryParLevel.deleteMany({ where: { inventoryLocationItemId: itemLocationId } });

  return prisma.inventoryParLevel.createMany({
    data: parLevels.map(p => ({
      inventoryLocationItemId: itemLocationId,
      dayOfWeek: p.dayOfWeek,
      amount: p.amount,
    })),
  });
}

export async function updateParLevel(id: string, amount: number) {
  return prisma.inventoryParLevel.update({
    where: { id },
    data: { amount },
  });
}

export async function deleteParLevel(id: string) {
  return prisma.inventoryParLevel.delete({
    where: { id },
  });
}
