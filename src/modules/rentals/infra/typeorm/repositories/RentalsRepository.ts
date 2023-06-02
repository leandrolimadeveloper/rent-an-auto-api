import { Repository, getRepository } from 'typeorm';
import { Rental } from '../entities/Rental';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openRentalByCar = await this.repository.findOne({
            where: {
                car_id,
                end_date: null,
            },
        });

        return openRentalByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openRentalByUser = await this.repository.findOne({
            where: {
                user_id,
                end_date: null,
            },
        });

        return openRentalByUser;
    }

    async create({ id, user_id, car_id, expected_return_date, end_date, total }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({ id, user_id, car_id, expected_return_date, end_date, total });

        await this.repository.save(rental);

        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = this.repository.findOne(id);

        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = this.repository.find({
            where: {
                user_id,
            },
            relations: ['car'],
        });

        return rentals;
    }
}

export { RentalsRepository };
