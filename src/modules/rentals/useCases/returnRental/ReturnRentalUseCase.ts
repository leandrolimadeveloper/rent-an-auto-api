import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/infra/http/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class ReturnRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) { }

    async execute({ id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id)
        const car = await this.carsRepository.findById(rental.car_id)

        const minimumDailyValue = 1

        if (!rental) {
            throw new AppError('Rental does not exist')
        }

        const dateNow = this.dateProvider.dateNow()

        let daily = this.dateProvider.compareInDays(dateNow, rental.expected_return_date)

        if (daily <= 0) {
            daily = minimumDailyValue
        }

        const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date)

        let total = 0

        if (delay > 0) {
            const calculate_fine_amount = delay * car.fine_amount
            total = calculate_fine_amount
        }

        total += daily * car.daily_rate

        rental.end_date = this.dateProvider.dateNow()
        rental.total = total

        await this.rentalsRepository.create(rental)
        await this.carsRepository.updateAvaiableCar(car.id, true)

        return rental
    }
}

export { ReturnRentalUseCase }
