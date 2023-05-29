import { AppError } from '@shared/infra/http/errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create a new category', () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it('should be able to create a new category', async () => {
        const category = {
            name: 'Category name test',
            description: 'Category description test',
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty('id');
    });

    // it('should not be able to create a new category with the same name of it', async () => {
    //     expect(async () => {
    //         const category = {
    //             name: 'Category name test',
    //             description: 'Category description test',
    //         };

    //         await createCategoryUseCase.execute({
    //             name: category.name,
    //             description: category.description,
    //         });

    //         await createCategoryUseCase.execute({
    //             name: category.name,
    //             description: category.description,
    //         });
    //     }).rejects.toBeInstanceOf(AppError);
    // });

    it('should not be able to create a new user if it already exists', async () => {
        const user = {
            name: 'User name test',
            email: 'email@test.com',
            password: 'pass',
        };

        await createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password,
        });

        await expect(
            createUserUseCase.execute({
                name: user.name,
                email: user.email,
                password: user.password,
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
