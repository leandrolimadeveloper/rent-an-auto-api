import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';

import { AppError } from '@shared/infra/http/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,

        @inject('EtherealMailProvider')
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        const timeInHourForRecoveringPassword = 3;

        if (!user) {
            throw new AppError('User does not exist');
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(timeInHourForRecoveringPassword);

        await this.usersTokensRepository.create({
            expires_date,
            user_id: user.id,
            refresh_token: token,
        });

        await this.mailProvider.sendMail(email, 'Recuperação de senha', `O link para recuperação da senha: ${token}`);
    }
}

export { SendForgotPasswordMailUseCase };
