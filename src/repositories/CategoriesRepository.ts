import { Category } from '../models/Category';

interface ICreateCategoryDTO {
    name: string
    description: string
}

class CategoriesRepository {
    private categories: Category[]

    constructor() {
        this.categories = []
    }

    create({name, description}: ICreateCategoryDTO): void {
        const category = new Category() 
   
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        })
    
        this.categories.push(category)

        console.log(this.categories)
    }

    list(): Category[] {
        return this.categories
    }

    findByName(name: string): Category {
        const categoryName = this.categories.find(category => category.name === name)
        console.log(categoryName)
        return categoryName
    }
}

export { CategoriesRepository }