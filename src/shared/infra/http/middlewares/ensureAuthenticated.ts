import auth from '@config/auth'
import { AppError } from '@shared/infra/http/errors/AppError'
import { NextFunction,Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('Token is missing', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload

        request.user = {
            id: user_id
        }

        next()
    } catch {
        throw new AppError('Invalid token', 401)
    }
}
