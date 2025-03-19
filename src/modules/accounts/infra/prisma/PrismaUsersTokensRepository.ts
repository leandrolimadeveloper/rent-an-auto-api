import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/prisma/IUsersTokensRepository'
import { PrismaClient, UserToken } from '@prisma/client'

const prisma = new PrismaClient()

class PrismaUsersTokensRepository implements IUsersTokensRepository {
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = await prisma.userToken.create({
            data: {
                expiresDate: expires_date,
                refreshToken: refresh_token,
                userId: user_id
            }
        })

        return userToken
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken | null> {
        const userToken = await prisma.userToken.findFirst({
            where: {
                userId: user_id,
                refreshToken: refresh_token
            }
        })

        return userToken
    }

    async deleteById(id: string): Promise<void> {
        await prisma.userToken.delete({
            where: { id }
        })
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken | null> {
        const userToken = await prisma.userToken.findFirst({
            where: {
                refreshToken: refresh_token
            }
        })

        return userToken
    }
}

export { PrismaUsersTokensRepository }
