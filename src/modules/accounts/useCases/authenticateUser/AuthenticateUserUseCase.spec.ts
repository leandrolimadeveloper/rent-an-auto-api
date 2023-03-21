import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@errors/AppError';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate an user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            name: 'User',
            email: 'user@test.com',
            password: '1234',
            driver_license: '0041',
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate a nonexistent user', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'user@test.com',
                password: '1234',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with an incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: 'User Test',
                email: 'user@test.com',
                password: '1234',
                driver_license: '123400',
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: 'user@test.com',
                password: 'incorrectPassword',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
