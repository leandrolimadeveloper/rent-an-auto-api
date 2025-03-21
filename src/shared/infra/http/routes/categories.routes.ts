import { CreateCategoryController } from '@modules/cars/useCases/Category/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/Category/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/Category/listCategories/ListCategoriesController'
import { Router } from 'express'
import multer from 'multer'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const categoriesRoutes = Router()

const upload = multer({
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post(
    '/import',
    ensureAuthenticated,
    ensureAdmin,
    upload.single('file'),
    importCategoryController.handle
)

export { categoriesRoutes }
