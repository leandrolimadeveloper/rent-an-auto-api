import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory'
import { AppError } from '@shared/infra/http/errors/AppError'

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory

describe('Send Recovering Password Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        mailProvider = new MailProviderInMemory()
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        )
    })

    it('should be able to send a forgot mail to user', async () => {
        const sendMail = jest.spyOn(mailProvider, 'sendMail')

        await usersRepositoryInMemory.create({
            name: 'User name',
            email: 'email@test.com',
            driver_license: '12ab',
            password: '123pass'
        })

        await sendForgotPasswordMailUseCase.execute('email@test.com')

        expect(sendMail).toHaveBeenCalled()
    })

    it('should not be able to send a forgot mail to a nonexistent user', async () => {
        await expect(sendForgotPasswordMailUseCase.execute('email@nonexistent.com')).rejects.toEqual(
            new AppError('User does not exist')
        )
    })

    it('should be able to generate an user token', async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create')

        usersRepositoryInMemory.create({
            name: 'Mabelle Tran',
            email: 'ek@re.eh',
            driver_license: 'M9z9g8',
            password: '123abc'
        })

        await sendForgotPasswordMailUseCase.execute('ek@re.eh')

        expect(generateTokenMail).toHaveBeenCalled()
    })
})
