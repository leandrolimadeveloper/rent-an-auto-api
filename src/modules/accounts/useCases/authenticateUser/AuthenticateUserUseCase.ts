import 'reflect-metadata'

import auth from '@config/auth'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/infra/http/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)
        const {
            secret_token,
            expires_in_token,
            secret_refresh_token,
            expires_in_refresh_token,
            expires_in_refresh_token_days
        } = auth

        if (!user) {
            throw new AppError('Email or password incorrect')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect')
        }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        const refreshToken = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        const refreshTokenExpiresDays = this.dateProvider.addDays(expires_in_refresh_token_days)

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token: refreshToken,
            expires_date: refreshTokenExpiresDays
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token: refreshToken
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }
