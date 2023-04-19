import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

import uploadConfig from '@config/upload';

import { CreateCarController } from '@modules/cars/useCases/Car/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/Car/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/Specification/CreateCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from '@modules/cars/useCases/Car/uploadCarImages/UploadCarImagesController';

const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationsController.handle);
carsRoutes.post(
    '/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    uploadCarImages.array('images'),
    uploadCarImagesController.handle
);

export { carsRoutes };
