import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ReturnRentalUseCase } from './ReturnRentalUseCase';

class ReturnRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;

        const returnRental = container.resolve(ReturnRentalUseCase);

        const rental = await returnRental.execute({ id, user_id });

        return response.status(200).json(rental);
    }
}

export { ReturnRentalController };
