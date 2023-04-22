import { AppError } from '@shared/infra/http/errors/AppError';
import { RentalsRepositoryInMemory } from '../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it('should be able to create a new rental', async () => {
        const rentall = await createRentalUseCase.execute({
            user_id: 'ab123',
            car_id: '12345abc',
            expected_return_date: new Date(),
        });

        console.log(rentall);

        expect(rentall).toHaveProperty('id');
        expect(rentall).toHaveProperty('start_date');
    });

    it('should not be able to create a new rental if there is already one open with the same user', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: 'same_user',
                car_id: 'car_1',
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: 'same_user',
                car_id: 'car_2',
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental if there is already one open with the same car', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: 'user_1',
                car_id: 'same_car',
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: 'user_2',
                car_id: 'same_car',
                expected_return_date: new Date(),
            });
        });
    });
});
