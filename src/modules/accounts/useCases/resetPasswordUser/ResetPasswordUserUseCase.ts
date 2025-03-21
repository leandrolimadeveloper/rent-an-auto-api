import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/infra/http/errors/AppError'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvide: IDateProvider,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefrestToken(token)

        if (!userToken) {
            throw new AppError('Token invalid')
        }

        if (this.dateProvide.compareIfBefore(userToken.expires_date, this.dateProvide.dateNow())) {
            throw new AppError('Token expired')
        }

        const user = await this.usersRepository.findById(userToken.user_id)

        user.password = await hash(password, 8)

        await this.usersRepository.create(user)

        await this.usersTokensRepository.deleteById(userToken.id)
    }
}

export { ResetPasswordUserUseCase }
