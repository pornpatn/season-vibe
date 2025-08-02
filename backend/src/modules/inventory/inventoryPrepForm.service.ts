import prisma from '../../lib/prisma';
import type { InventoryPrepForm } from '@prisma/client';

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
export async function createPrepForm(itemId: string, data: Partial<InventoryPrepForm>): Promise<InventoryPrepForm> {
  return prisma.inventoryPrepForm.create({
    data: {
      name: data.name!,
      unitId: data.unitId!,
      conversionRate: Number(data.conversionRate),
      inventoryItemId: itemId,
      note: data.note ?? null,
    },
  });
}

// Update an existing prep form
export async function updatePrepForm(id: string, data: Partial<InventoryPrepForm>): Promise<InventoryPrepForm> {
  return prisma.inventoryPrepForm.update({
    where: { id },
    data: {
      name: data.name,
      unitId: data.unitId,
      conversionRate: data.conversionRate ? Number(data.conversionRate) : undefined,
      note: data.note,
    },
  });
}

// Delete a prep form
export async function deletePrepForm(id: string): Promise<void> {
  await prisma.inventoryPrepForm.delete({ where: { id } });
}
