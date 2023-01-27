import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

import { CreateCategoryService } from "../services/CreateCategoryService";
import { ListCategoryService } from "../services/ListCategoryService";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(
        categoriesRepository
    );

    createCategoryService.execute({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
    // const all = categoriesRepository.list()
    const listCategoryService = new ListCategoryService(categoriesRepository);

    listCategoryService.execute();

    return response.json(listCategoryService);
});

export { categoriesRoutes };
