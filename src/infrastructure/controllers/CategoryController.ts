import {CategoryService} from "../../domain/services/CategoryService";
import { RequestHandler } from 'express';
import checkObjectType from '../../utils/checkObjectType';
import {ApiError} from "../../errors/API.error";

export class CategoryController {
    constructor(private _service: CategoryService) {}

    getCategoryById: RequestHandler = async (req, res) => {
        const categoryId = Number(req.params.category_id);

        if (!categoryId) {
            return res
                .status(404)
                .json({ status: res.statusCode, message: 'Invalid category ID'});
        }

        try {
            const category = await this._service.getById(categoryId);

            return res
                .status(200)
                .json({ status: res.statusCode, message: 'Category has been found', category: category });
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({ status: res.statusCode, message: err.message});
            }
        }
    };

    deleteCategory: RequestHandler = async (req, res) => {
        const categoryId = Number(req.params.category_id);

        if (!categoryId) {
            return res
                .status(404)
                .json({ status: res.statusCode, message: 'Invalid category ID'});
        }

        try {
            await this._service.delete(categoryId);

            return res
                .status(200)
                .json({ status: res.statusCode, message: 'Category has been deleted!' });
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({ status: res.statusCode, message: err.message});
            }
        }
    };

    createCategory: RequestHandler = async (req, res) => {
        const { categoryName } = req.body;

        if (!categoryName || checkObjectType(categoryName)) {
            return res
                .status(400)
                .json({ status: res.statusCode, error: 'Invalid category name' });
        }

        try {
            const category = await this._service.create(req.body);

            return res.status(201).json({ status: res.statusCode, message: 'Category has been created', category: category });
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({ status: res.statusCode, message: err.message});
            }
        }
    };
}
