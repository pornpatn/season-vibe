import prisma from '../../lib/prisma';

// Get all prep forms for a specific inventory item
export const getPrepFormsByItem = async (inventoryItemId: string) => {
  return prisma.inventoryPrepForm.findMany({
    where: { inventoryItemId },
    include: { unit: true },
    orderBy: { name: 'asc' },
  });
};

// Get a single prep form by ID
export const getPrepFormById = async (id: string) => {
  return prisma.inventoryPrepForm.findUnique({
    where: { id },
    include: { unit: true },
  });
};

// Create a new prep form
export const createPrepForm = async (data: any) => {
  return prisma.inventoryPrepForm.create({ data });
};

// Update an existing prep form
export const updatePrepForm = async (id: string, data: any) => {
  return prisma.inventoryPrepForm.update({
    where: { id },
    data,
  });
};

// Delete a prep form
export const deletePrepForm = async (id: string) => {
  return prisma.inventoryPrepForm.delete({
    where: { id },
  });
};
