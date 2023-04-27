import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license } = request.body;

        const createUseCase = container.resolve(CreateUserUseCase);

        await createUseCase.execute({
            name,
            email,
            password,
            driver_license,
        });

        return response.status(201).send();
    }
}

export { CreateUseController };
