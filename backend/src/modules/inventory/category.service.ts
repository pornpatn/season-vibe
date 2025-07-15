import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      displayOrder: 'asc',
    },
  });
};

export const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
  });
};

export const createCategory = async (data: any) => {
  return prisma.category.create({
    data,
  });
};

export const updateCategory = async (id: string, data: any) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};