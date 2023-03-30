import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/infra/http/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it('should be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-123',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'category',
        });

        expect(car).toHaveProperty('id');
    });

    it('should not be able to create a new car if license plate already exists', async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: 'Name Car 1',
                description: 'Description Car',
                daily_rate: 100,
                license_plate: 'ABC-123',
                fine_amount: 80,
                brand: 'Brand',
                category_id: 'category',
            });

            await createCarUseCase.execute({
                name: 'Name Car 2',
                description: 'Description Car',
                daily_rate: 100,
                license_plate: 'ABC-123',
                fine_amount: 80,
                brand: 'Brand',
                category_id: 'category',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to create a new car with availability setted as true', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name Car 1',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABCD-123',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'category',
        });

        expect(car.available).toBe(true);
    });
});
