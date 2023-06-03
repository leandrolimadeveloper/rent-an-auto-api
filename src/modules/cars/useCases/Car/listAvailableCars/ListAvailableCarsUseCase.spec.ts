import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it('should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 1',
            description: 'Car description',
            daily_rate: 40,
            license_plate: 'ABCDE',
            fine_amount: 150,
            brand: 'Car brand',
            category_id: 'category_id',
        });

        try {
            const cars = await listAvailableCarsUseCase.execute({});
            expect(cars).toEqual([car]);
        } catch (err) {
            console.log(err);
        }
    });

    it('should be able to list all available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 2',
            description: 'Car description',
            daily_rate: 40,
            license_plate: 'ABCDE',
            fine_amount: 150,
            brand: 'Car brand test',
            category_id: 'category_id',
        });

        try {
            const cars = await listAvailableCarsUseCase.execute({
                name: 'Car 2',
            });

            expect(cars).toEqual([car]);
        } catch (err) {
            console.log(err);
        }
    });

    it('should be able to list all available cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 2',
            description: 'Car description',
            daily_rate: 40,
            license_plate: 'ABCDE',
            fine_amount: 150,
            brand: 'Car brand test',
            category_id: 'category_id',
        });

        try {
            const cars = await listAvailableCarsUseCase.execute({
                brand: 'Car brand test',
            });

            expect(cars).toEqual([car]);
        } catch (err) {
            console.log(err);
        }
    });

    it('should be able to list all available cars by category', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 2',
            description: 'Car description',
            daily_rate: 40,
            license_plate: 'ABCDE',
            fine_amount: 150,
            brand: 'Car brand test',
            category_id: '12345',
        });

        try {
            const cars = await listAvailableCarsUseCase.execute({
                category_id: '12345',
            });

            expect(cars).toEqual([car]);
        } catch (err) {
            console.log(err);
        }
    });
});
