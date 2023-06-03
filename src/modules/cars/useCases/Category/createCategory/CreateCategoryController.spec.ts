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

    it('should be able to create a new category', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com',
            password: 'adminpass',
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Category supertest',
                description: 'Category supertest description',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    }, 20000);

    it('should not be able to create a new category if it already exists', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com',
            password: 'adminpass',
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Category supertest',
                description: 'Category supertest description',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    }, 20000);
});
