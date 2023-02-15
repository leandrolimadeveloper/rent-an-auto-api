import { Router } from "express";

import multer from "multer";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
})

import { createCategoryController } from "../modules/useCases/createCategory";
import { listCategoriesController } from "../modules/useCases/listCategories";

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response)
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response)
});

categoriesRoutes.post('/import', upload.single("file"), (request, response) => {
    const { file } = request
    console.log(file)
    return response.send()
})

export { categoriesRoutes };
