import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('Token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(token, 'b9ba46a00fa95cbc55dabd155571cb9b') as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new Error("User doesn't exists");
        }

        next();
    } catch {
        throw new Error('Invalid token');
    }
}
