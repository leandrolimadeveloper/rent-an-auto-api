import { Router } from "express";

import multer from "multer";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
})

import createCategoryController from "../modules/useCases/Category/createCategory";
import { listCategoriesController } from "../modules/useCases/Category/listCategories";
import { importCategoryController } from "../modules/useCases/Category/importCategory";

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController().handle(request, response)
});

categoriesRoutes.get("/", (request, response) => {
    // console.log('Olá')
    return listCategoriesController.handle(request, response)
});

categoriesRoutes.post('/import', upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response)
})

export { categoriesRoutes };
