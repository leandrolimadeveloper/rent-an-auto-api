import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import { AppError } from '@shared/infra/http/errors/AppError';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

let createUserUseCase: CreateUserUseCase;

describe('Authenticate an user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        );
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

    it('should not be able to authenticate a non-existent user', async () => {
        await expect(() => {
            authenticateUserUseCase.execute({
                email: 'user@test.com',
                password: '1234',
            });
        }).rejects.toEqual(new AppError('Email or password incorrect'));
    });

    it('should not be able to authenticate with an incorrect password', async () => {
        const user: ICreateUserDTO = {
            name: 'User Test',
            email: 'user@test.com',
            password: '1234',
            driver_license: '123400',
        };

        await createUserUseCase.execute(user);

        await expect(() => {
            authenticateUserUseCase.execute({
                email: 'user@test.com',
                password: 'incorrectPassword',
            });
        }).rejects.toEqual(new AppError('Email or password incorrect'));
    });
});
