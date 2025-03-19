import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { UserToken } from '@prisma/client'

interface IUsersTokensRepository {
    create(data: ICreateUserTokenDTO): Promise<UserToken>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken | null>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserToken | null>;
}

export { IUsersTokensRepository }
