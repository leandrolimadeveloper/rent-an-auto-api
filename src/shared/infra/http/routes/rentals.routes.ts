import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ReturnRentalController } from '@modules/rentals/useCases/returnRental/ReturnRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post('/return/:id', ensureAuthenticated, returnRentalController.handle);
rentalsRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle);

export { rentalsRoutes };
