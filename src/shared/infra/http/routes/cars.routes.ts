import uploadConfig from '@config/upload'
import { CreateCarController } from '@modules/cars/useCases/Car/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modules/cars/useCases/Car/listAvailableCars/ListAvailableCarsController'
import { UploadCarImagesController } from '@modules/cars/useCases/Car/uploadCarImages/UploadCarImagesController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/Specification/CreateCarSpecification/CreateCarSpecificationController'
import { Router } from 'express'
import multer from 'multer'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

const uploadCarImages = multer(uploadConfig)

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationsController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get('/available', listAvailableCarsController.handle)
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationsController.handle)
carsRoutes.post(
    '/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    uploadCarImages.array('images'),
    uploadCarImagesController.handle
)

export { carsRoutes }
