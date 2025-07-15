import request from 'supertest';
import app from '../../src/app';
import prisma from '../../src/prisma';

jest.mock('../../src/middleware/authMiddleware', () => ({
    authenticate: (_req: any, _res: any, next: any) => next(),
}));

jest.mock('../../src/middleware/authorize', () => ({
    authorize: () => (req: any, _res: any, next: any) => {
        req.user = { userId: 'test-user', roleId: 'test-role' };
        next();
    }
}));

describe('Permission API', () => {
    let role: any;

    beforeAll(async () => {
        role = await prisma.role.create({ data: { name: 'PermissionTestRole' } });
    });

    afterAll(async () => {
        await prisma.permission.deleteMany({ where: { roleId: role.id } });
        await prisma.role.delete({ where: { id: role.id } });
        await prisma.$disconnect();
    });

    xit('should create permissions for a role', async () => {
        const res = await request(app)
            .post(`/api/permissions/role/${role.id}`)
            .send([
                { module: 'users', action: 'view' },
                { module: 'users', action: 'view' }
            ]);

        expect(res.statusCode).toBe(204);
    });

    it('should list permissions by role', async () => {
        const res = await request(app).get(`/api/permissions/role/${role.id}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});