import prisma from '../../lib/prisma';

export function listPermissions() {
  return prisma.permission.findMany();
}

export function getPermissionById(id: string) {
  return prisma.permission.findUnique({ where: { id } });
}

export function createPermission(data: any) {
  return prisma.permission.create({ data });
}

export function deletePermission(id: string) {
  return prisma.permission.delete({ where: { id } });
}

export function listPermissionsByRole(roleId: string) {
  return prisma.permission.findMany({ where: { roleId } });
}

export function updateRolePermissions(roleId: string, permissions: { module: string, action: string }[]) {
  return prisma.$transaction([
    prisma.permission.deleteMany({ where: { roleId } }),
    prisma.permission.createMany({
      data: permissions.map(p => ({ ...p, roleId })),
      skipDuplicates: true
    } as Parameters<typeof prisma.permission.createMany>[0])
  ]);
}