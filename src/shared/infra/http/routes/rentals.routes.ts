import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ReturnRentalController } from '@modules/rentals/useCases/returnRental/ReturnRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post('/return/:id', ensureAuthenticated, returnRentalController.handle);

export { rentalsRoutes };
