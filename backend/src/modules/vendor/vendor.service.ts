import prisma from '../../lib/prisma';
import type { Prisma } from '@prisma/client';

export async function getAllVendors() {
  return prisma.vendor.findMany({
    include: {
      contacts: true,
    },
    orderBy: { name: 'asc' },
  });
}

export async function getVendorById(id: string) {
  return prisma.vendor.findUnique({
    where: { id },
    include: {
      contacts: true,
      inventoryVendorItems: {
        include: {
          inventoryItem: true,
          unit: true,
        },
      },
    },
  });
}

export async function createVendor(data: Prisma.VendorCreateInput) {
  return prisma.vendor.create({ data });
}

export async function updateVendor(id: string, data: Prisma.VendorUpdateInput) {
  return prisma.vendor.update({
    where: { id },
    data,
  });
}

export async function deleteVendor(id: string) {
  return prisma.vendor.delete({
    where: { id },
  });
}

export async function createVendorContact(vendorId: string, data: Prisma.VendorContactCreateInput) {
  return prisma.vendorContact.create({
    data: {
      ...data,
      vendor: { connect: { id: vendorId } },
    },
  });
}

export async function updateVendorContact(id: string, data: Prisma.VendorContactUpdateInput) {
  return prisma.vendorContact.update({
    where: { id },
    data,
  });
}

export async function deleteVendorContact(id: string) {
  return prisma.vendorContact.delete({
    where: { id },
  });
}