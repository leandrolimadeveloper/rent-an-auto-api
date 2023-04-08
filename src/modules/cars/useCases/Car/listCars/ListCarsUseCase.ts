import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
    name?: string;
    category_id?: string;
    brand?: string;
}

class ListCarsUseCase {
    constructor(private carsRepository: ICarsRepository) {}

    async execute({ name, category_id, brand }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailableCars();

        return cars;
    }
}

export { ListCarsUseCase };
