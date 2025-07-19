import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUnits = async () => {
  return prisma.unit.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

export const getUnitById = async (id: string) => {
  return prisma.unit.findUnique({
    where: { id },
  });
};

export const createUnit = async (data: any) => {
  return prisma.unit.create({
    data,
  });
};

export const updateUnit = async (id: string, data: any) => {
  return prisma.unit.update({
    where: { id },
    data,
  });
};

export const deleteUnit = async (id: string) => {
  return prisma.unit.delete({
    where: { id },
  });
};
