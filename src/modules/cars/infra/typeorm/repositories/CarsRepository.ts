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
        });

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }
}

export { CarsRepository };
