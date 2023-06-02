import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { car_id, expected_return_date } = request.body;

        const createRentalUseCase = container.resolve(CreateRentalUseCase);
        try {
            const rental = await createRentalUseCase.execute({
                car_id,
                expected_return_date,
                user_id: id,
            });
            return response.status(201).json(rental);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { CreateRentalController };
