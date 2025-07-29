import prisma from '../../lib/prisma';

export const getLocationItemsByLocation = async (locationId: string) => {
  return prisma.inventoryLocationItem.findMany({
    where: { locationId },
    include: { inventoryItem: true },
  });
};

export const addLocationItem = async (data: any) => {
  return prisma.inventoryLocationItem.create({ data });
};

export const removeLocationItem = async (id: string) => {
  return prisma.inventoryLocationItem.delete({
    where: { id },
  });
};
