import { AppError } from '@shared/infra/http/errors/AppError';
import { IRentalsRepository } from '../repositories/IRentalsRepository';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(private rentalsRepository: IRentalsRepository) {}

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        const carInUse = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carInUse) {
            throw new AppError('Car is unavailable. There is an rental open for this car.');
        }

        const rentalByUserInUse = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalByUserInUse) {
            throw new AppError('User already have a rental of a car in progress.');
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
