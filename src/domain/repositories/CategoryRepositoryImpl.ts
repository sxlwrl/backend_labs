import {ICategoryRepository} from './interfaces/ICategoryRepository'
import {Category} from '../entities/Category';
import {CategoryModel} from "../../infrastructure/models/CategoryModel";
import {ApiError} from "../../errors/API.error";

export class CategoryRepositoryImpl implements ICategoryRepository {
    private async checkCategoryExistence(id: number): Promise<void> {
        if (!await CategoryModel.findByPk(id)) {
            throw new ApiError('Category is not found');
        }
    };

    async getById(id: number): Promise<CategoryModel> {
        await this.checkCategoryExistence(id);
        return await CategoryModel.findByPk(id) as CategoryModel;
    };

    async delete(id: number): Promise<void> {
        await this.checkCategoryExistence(id);
        const category = await CategoryModel.findByPk(id) as CategoryModel;
        await category.destroy();
    };

    async create(category: Category): Promise<CategoryModel> {
        return CategoryModel.create({
            categoryName: category.getCategoryName,
        });
    };
}