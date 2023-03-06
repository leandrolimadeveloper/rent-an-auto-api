import { Router } from 'express';

import multer from 'multer';

import { CreateCategoryController } from '../modules/useCases/Category/createCategory/CreateCategoryController';
import { listCategoriesController } from '../modules/useCases/Category/listCategories';
import { importCategoryController } from '../modules/useCases/Category/importCategory';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request, response) => {
    // console.log('Olá')
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
