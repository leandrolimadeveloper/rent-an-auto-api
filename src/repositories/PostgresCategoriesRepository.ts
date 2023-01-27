import { Category } from "../models/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
    findByName(name: string): Category {
        return null
    }
    list(): Category[] {
        return null
    }
    create({name, description}: ICreateCategoryDTO): void {
        console.log(name, description)
        // throw new Error("Method not implemented.");
    }
}

export { PostgresCategoriesRepository }