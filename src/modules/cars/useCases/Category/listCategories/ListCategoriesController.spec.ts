import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcryptjs';

import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Create Category Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash('adminpass', 8);

        await connection.query(
            `
            INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
            values('${id}', 'admin', 'admin@rentx.com', '${password}', 'true', 'ABC123456', 'now()')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should be able to list all categories', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com',
            password: 'adminpass',
        });

        const { token } = responseToken.body;

        await request(app)
            .post('/categories')
            .send({
                name: 'Category supertest',
                description: 'Category supertest description',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app).get('/categories');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].name).toEqual('Category supertest');
    });
});
