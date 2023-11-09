import { ICategoryRepository } from '../repositories/interfaces/ICategory.repository';
import { Service } from './Service';
import { CreateCategoryDto } from '../dto/CreateCategory.dto';
import { Category } from '../entities/Category';

export class CategoryService extends Service<Category, CreateCategoryDto> {
    constructor(private readonly _categoryRepository: ICategoryRepository) {
        super(_categoryRepository);
    };
}
