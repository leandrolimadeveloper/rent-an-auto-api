import { container } from 'tsyringe';

import { CategoriesRepository } from '../../modules/repositories/implementations/CategoriesRepository';
import { ICategoriesRepository } from '../../modules/repositories/ICategoriesRepository';
import { SpecificationsRepository } from '../../modules/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/repositories/ISpecificationsRepository';

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);

container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);
