import prisma from '../../lib/prisma';

export async function createLocationAssignment(
  itemId: string,
  locationId: string,
  parLevels: { dayOfWeek: number; amount: number }[]
) {
  return await prisma.inventoryLocationItem.create({
    data: {
      inventoryItemId: itemId,
      locationId,
      parLevels: {
        create: parLevels.map(pl => ({
          dayOfWeek: pl.dayOfWeek,
          amount: pl.amount,
        })),
      },
    },
    include: {
      location: true,
      parLevels: true,
    },
  });
}

export async function updateParLevels(
  itemId: string,
  assignmentId: string,
  parLevels: { dayOfWeek: number; amount: number }[]
) {
  await prisma.inventoryParLevel.deleteMany({
    where: { inventoryLocationItemId: assignmentId },
  });

  return await prisma.inventoryLocationItem.update({
    where: { id: assignmentId },
    data: {
      parLevels: {
        create: parLevels.map(pl => ({
          dayOfWeek: pl.dayOfWeek,
          amount: pl.amount,
        })),
      },
    },
    include: {
      location: true,
      parLevels: true,
    },
  });
}

export async function deleteLocationAssignment(assignmentId: string) {
  return await prisma.$transaction([
    prisma.inventoryParLevel.deleteMany({
      where: { inventoryLocationItemId: assignmentId },
    }),
    prisma.inventoryLocationItem.delete({
      where: { id: assignmentId },
    }),
  ]);
}