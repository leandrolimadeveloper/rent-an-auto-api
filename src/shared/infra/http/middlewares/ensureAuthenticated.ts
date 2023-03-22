import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/infra/http/errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(token, 'b9ba46a00fa95cbc55dabd155571cb9b') as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User doesn't exists", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError('Invalid token', 401);
    }
}
