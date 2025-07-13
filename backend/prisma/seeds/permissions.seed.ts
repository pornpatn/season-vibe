import { PrismaClient } from '@prisma/client';

export default async function seedPermissions(prisma: PrismaClient) {
  const roles = await prisma.role.findMany();
  const roleMap = Object.fromEntries(roles.map(r => [r.name, r.id]));

  const permissionMatrix = {
    Owner: [
      { module: 'inventory', action: 'view' },
      { module: 'inventory', action: 'edit' },
      { module: 'ordering', action: 'view' },
      { module: 'ordering', action: 'edit' },
      { module: 'users', action: 'view' },
      { module: 'users', action: 'edit' },
      { module: 'settings', action: 'edit' },
    ],
    Admin: [
      { module: 'users', action: 'view' },
      { module: 'users', action: 'edit' },
      { module: 'settings', action: 'edit' },
    ],
    Manager: [
      { module: 'inventory', action: 'view' },
      { module: 'inventory', action: 'edit' },
      { module: 'ordering', action: 'view' },
      { module: 'ordering', action: 'edit' },
    ],
    Staff: [
      { module: 'inventory', action: 'view' },
      { module: 'inventory', action: 'edit' },
    ],
  };

  for (const [roleName, permissions] of Object.entries(permissionMatrix)) {
    const roleId = roleMap[roleName];
    for (const { module, action } of permissions) {
      await prisma.permission.upsert({
        where: {
          roleId_module_action: {
            roleId,
            module,
            action,
          },
        },
        update: {},
        create: { roleId, module, action },
      });
    }
  }

  console.log('✅ Permissions seeded');
}
