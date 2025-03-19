import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/prisma/IUsersRepository'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

class PrismaUsersRepository implements IUsersRepository {
    async create({ id, name, email, driver_license, password, avatar }: ICreateUserDTO): Promise<void> {
        await prisma.user.create({
            data: {
                id,
                name,
                email,
                driver_license,
                password,
                avatar
            }
        })
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        })

        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        return user
    }
}

export { PrismaUsersRepository }
