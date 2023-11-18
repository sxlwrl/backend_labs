import {Router} from 'express';

import {CategoryRepositoryImpl} from '../repositories/CategoryRepositoryImpl';
import {CategoryController} from '../controllers/CategoryController';
import {CategoryService} from '../services/CategoryService';

import IRoutes from './routes-interfaces/IRoutes';

class UserRoutes implements IRoutes {
    public router: Router = Router();
    private categoryService: CategoryService = new CategoryService(new CategoryRepositoryImpl())
    private categoryController: CategoryController = new CategoryController(this.categoryService);

    constructor() {
        this.initializeRoutes();
    };

    initializeRoutes() {
        this.router.get('/category/:category_id', this.categoryController.getCategoryById);
        this.router.post('/category', this.categoryController.createCategory);
        this.router.delete('/category/:category_id', this.categoryController.deleteCategory);
    };
}

export default UserRoutes;