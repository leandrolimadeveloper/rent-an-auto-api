import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { NextFunction, Request, Response } from 'express'

import { AppError } from '../errors/AppError'

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(id)

    if (!user.isAdmin) {
        throw new AppError('User isn\'t admin')
    }

    return next()
}
