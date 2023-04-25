import { AppError } from '@shared/infra/http/errors/AppError';
import { RentalsRepositoryInMemory } from '../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import dayjs from 'dayjs';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
    const dayAdd24Hours = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: 'ab123',
            car_id: '12345abc',
            expected_return_date: dayAdd24Hours,
        });

        console.log('Rental', rental);

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('should not be able to create a new rental if there is already one open with the same user', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: 'same_user',
                car_id: 'car_1',
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: 'same_user',
                car_id: 'car_2',
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental if there is already one open with the same car', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: 'user_1',
                car_id: 'same_car',
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: 'user_2',
                car_id: 'same_car',
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental if expected time to return a car to be less than 24 hours', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '123',
                car_id: 'test',
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
