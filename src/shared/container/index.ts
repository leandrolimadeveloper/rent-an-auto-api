import { container } from 'tsyringe';

import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);

container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
