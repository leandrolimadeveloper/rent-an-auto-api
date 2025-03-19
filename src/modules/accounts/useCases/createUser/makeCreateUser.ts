import { PrismaUsersRepository } from '@modules/accounts/infra/prisma/PrismaUsersRepository'

import { CreateUserUseCase } from './CreateUserUseCase'

export function makeCreateUser() {
    const usersRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    return createUserUseCase
}
