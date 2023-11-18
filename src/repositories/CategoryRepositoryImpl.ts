import {ICategoryRepository} from './interfaces/ICategoryRepository'
import {Category} from '../entities/Category';

import {RepositoryImpl} from './RepositoryImpl';

export class CategoryRepositoryImpl extends RepositoryImpl<Category> implements ICategoryRepository {}