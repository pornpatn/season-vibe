import prisma from '../../prisma';

export function listRoles() {
  return prisma.role.findMany();
}

export function getRoleById(id: string) {
  return prisma.role.findUnique({ where: { id } });
}

export function createRole(data: any) {
  return prisma.role.create({ data });
}

export function updateRole(id: string, data: any) {
  return prisma.role.update({ where: { id }, data });
}

export function deleteRole(id: string) {
  return prisma.role.delete({ where: { id } });
}