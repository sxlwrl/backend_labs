import {Router} from 'express';

import {CategoryRepositoryImpl} from '../domain/repositories/CategoryRepositoryImpl';
import {CategoryController} from '../infrastructure/controllers/CategoryController';
import {CategoryService} from '../domain/services/CategoryService';

import IRoutes from './routes-interfaces/IRoutes';
import {authenticateToken} from "../middleware/authMiddleware";

class UserRoutes implements IRoutes {
    public router: Router = Router();
    private categoryService: CategoryService = new CategoryService(new CategoryRepositoryImpl())
    private categoryController: CategoryController = new CategoryController(this.categoryService);

    constructor() {
        this.initializeRoutes();
    };

    initializeRoutes() {
        this.router.get('/category/:category_id', authenticateToken, this.categoryController.getCategoryById);
        this.router.post('/category', authenticateToken, this.categoryController.createCategory);
        this.router.delete('/category/:category_id', authenticateToken, this.categoryController.deleteCategory);
    };
}

export default UserRoutes;