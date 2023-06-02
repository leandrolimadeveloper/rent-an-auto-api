import { inject, injectable } from 'tsyringe';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { AppError } from '@shared/infra/http/errors/AppError';

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        const minimumHoursForRentACar = 24;

        const carInUse = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carInUse) {
            throw new AppError('Car is unavailable. There is an rental open for this car.');
        }

        const rentalByUserInUse = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalByUserInUse) {
            throw new AppError('User already have a rental of a car in progress.');
        }

        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(expected_return_date, dateNow);

        console.log('Compare date', compare);

        if (compare < minimumHoursForRentACar) {
            throw new AppError('The time is very short for renting a car. It must be at least greater than 24 hours');
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvaiableCar(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase };
