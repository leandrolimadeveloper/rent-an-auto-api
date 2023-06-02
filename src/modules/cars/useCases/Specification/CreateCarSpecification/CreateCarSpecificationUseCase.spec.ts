import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

import { AppError } from '@shared/infra/http/errors/AppError';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it('should not be able to add a new specification to a non-existent car', async () => {
        const car_id = '123';
        const specifications_id = ['12345'];

        await expect(() => {
            createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toEqual(new AppError("Car doesn't exist"));
    });

    it('should be able to add a new specification for the car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-123',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'category',
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: 'Specification',
            description: 'Specification description',
        });

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty('specifications');
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
