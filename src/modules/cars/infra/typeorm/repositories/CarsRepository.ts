import { getRepository, Repository } from 'typeorm';
import { ICarsRepository } from '../../../repositories/ICarsRepository';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name: data.name,
            brand: data.brand,
            category_id: data.category_id,
            description: data.description,
            fine_amount: data.fine_amount,
            license_plate: data.license_plate,
            daily_rate: data.daily_rate,
            specifications: data.specifications,
            id: data.id,
        });

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);

        return car;
    }

    async findAvailableCars(name?: string, brand?: string, category_id?: string): Promise<Car[]> {
        const carsQuery = this.repository.createQueryBuilder('c').where('available = :available', { available: true });

        if (brand) {
            carsQuery.andWhere('c.brand = :brand', { brand });
        }

        if (name) {
            carsQuery.andWhere('c.name = :name', { name });
        }

        if (category_id) {
            carsQuery.andWhere('c.category_id = :category_id', { category_id });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async updateAvaiableCar(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where('id = :id')
            .setParameters({ id })
            .execute();
    }
}

export { CarsRepository };
