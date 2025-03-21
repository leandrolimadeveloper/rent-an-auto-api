import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { inject,injectable } from 'tsyringe'

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
        const cars = await this.carsRepository.findAvailableCars(name, brand, category_id)

        return cars
    }
}

export { ListAvailableCarsUseCase }
