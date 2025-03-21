import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../infra/typeorm/entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = []

    async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const user = new User()

        Object.assign(user, {
            name,
            email,
            password,
            driver_license
        })

        this.users.push(user)
    }

    async findById(id: string): Promise<User | undefined> {
        const user = this.users.find((user) => user.id === id)

        return user
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find((user) => user.email === email)
    }
}

export { UsersRepositoryInMemory }
