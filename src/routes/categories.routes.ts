import { Router } from 'express';

import multer from 'multer';

import { CreateCategoryController } from '../modules/useCases/Category/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../modules/useCases/Category/listCategories/ListCategoriesController';
import { ImportCategoryController } from '../modules/useCases/Category/importCategory/ImportCategoryController';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle);

export { categoriesRoutes };
