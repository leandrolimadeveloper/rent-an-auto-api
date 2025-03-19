import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = []

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        id
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car()

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            id
        })

        this.cars.push(car)

        return car
    }

    async findByLicensePlate(licence_plate: string): Promise<Car> {
        const car = this.cars.find((car) => car.license_plate === licence_plate)

        return car
    }

    async findAvailableCars(category_id?: string, name?: string, brand?: string): Promise<Car[]> {
        this.cars
            .filter((car) => car.available === true)
            .filter(
                (car) =>
                    (brand && car.brand === brand) ||
                    (category_id && car.category_id === category_id) ||
                    (name && car.name === name)
            )

        return this.cars
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id)
    }

    async updateAvaiableCar(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === id)

        this.cars[findIndex].available = available
    }
}

export { CarsRepositoryInMemory }
