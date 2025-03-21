import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'
import { AppError } from '@shared/infra/http/errors/AppError'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create a new category', () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it('should be able to create a new category', async () => {
        const category = {
            name: 'Category name test',
            description: 'Category description test'
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

        expect(categoryCreated).toHaveProperty('id')
    })

    it('should not be able to create a new category with the same name of it', async () => {
        const category = {
            name: 'Category name test',
            description: 'Category description test'
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })

        await expect(
            createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        ).rejects.toEqual(new AppError('Category already exists'))
    })
})
