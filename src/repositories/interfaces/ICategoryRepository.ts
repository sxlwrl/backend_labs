import { Category } from '../../entities/Category';
import { CreateCategoryDto } from '../../dto/CreateCategory.dto';
import { IRepository } from './IRepository';

export interface ICategoryRepository extends IRepository<Category, CreateCategoryDto> {}