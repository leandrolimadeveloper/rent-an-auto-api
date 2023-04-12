import { injectable, inject } from 'tsyringe';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
    name?: string;
    category_id?: string;
    brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailableCars(name, brand, category_id);

        return cars;
    }
}

export { ListAvailableCarsUseCase };
