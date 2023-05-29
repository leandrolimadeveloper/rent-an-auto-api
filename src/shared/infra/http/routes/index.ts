import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { rentalsRoutes } from './rentals.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use(authenticateRoutes);
routes.use('/cars', carsRoutes);
routes.use('/rentals', rentalsRoutes);

export { routes };
