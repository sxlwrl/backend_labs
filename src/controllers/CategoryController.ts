import { RequestHandler } from 'express';
import { CategoryService } from '../services/CategoryService';
import checkObjectType from '../utils/checkObjectType';
import { CreateCategoryDto } from '../dto/CreateCategory.dto';

export class CategoryController {
    constructor(private readonly _categoryService: CategoryService) {}

    public getCategoryById: RequestHandler = (req, res) => {
        const categoryId = req.params.category_id;
        const category = this._categoryService.getById(categoryId);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        res.status(200).json({
            message: 'Category has been found',
            category: category,
        });
    };

    public createCategory: RequestHandler = (req, res) => {
        const data = req.body as CreateCategoryDto;

        if (!data.categoryName || checkObjectType(data.categoryName)) {
            return res.status(400).send('Invalid category name');
        }

        const newCategory = this._categoryService.create(data);

        return res
            .status(201)
            .json({
                message: 'Category has been created',
                category: newCategory,
            });
    };

    public deleteCategory: RequestHandler = (req, res) => {
        const categoryId = req.params.category_id;

        const category = this._categoryService.getById(categoryId);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        this._categoryService.delete(categoryId);

        return res.status(200).json({ message: 'Category has been deleted' });
    };
}
