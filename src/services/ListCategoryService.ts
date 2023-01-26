import { CategoriesRepository } from "../repositories/CategoriesRepository";

class ListCategoryService {
    constructor(private categoriesRepository: CategoriesRepository) {}
    execute(): void {
        const all = this.categoriesRepository.list();
    }
}

export { ListCategoryService }; 
