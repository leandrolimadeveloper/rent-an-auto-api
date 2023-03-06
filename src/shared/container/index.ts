import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/repositories/implementations/CategoriesRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);
