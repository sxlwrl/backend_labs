import {ICategoryRepository} from "../repositories/interfaces/ICategoryRepository";
import {CreateCategoryDto} from "../../dto/CreateCategory.dto";
import {Category} from "../entities/Category";

export class CategoryService {
    constructor(private readonly _repository: ICategoryRepository) {};

    async getById(id: number) {
        return this._repository.getById(id);
    };

    async delete(id: number) {
        return this._repository.delete(id);
    };

    async create(data: CreateCategoryDto) {
        const {categoryName} = data;

        const category = new Category(categoryName);

        return this._repository.create(category);
    };
}
