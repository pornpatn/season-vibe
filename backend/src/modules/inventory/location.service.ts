import prisma from '../../lib/prisma';

export async function getAllLocations() {
  return prisma.location.findMany();
}

export async function getLocationById(id: string) {
  return prisma.location.findUnique({
    where: { id },
  });
}

export async function createLocation(data: { name: string }) {
  return prisma.location.create({
    data,
  });
}

export async function updateLocation(id: string, data: { name: string }) {
  return prisma.location.update({
    where: { id },
    data,
  });
}

export async function deleteLocation(id: string) {
  return prisma.location.delete({
    where: { id },
  });
}
