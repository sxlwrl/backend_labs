import {Router} from 'express';

import {UserRepositoryImpl} from "../domain/repositories/UserRepositoryImpl";
import {UserController} from "../infrastructure/controllers/UserController";
import {UserService} from "../domain/services/UserService";

import IRoutes from './routes-interfaces/IRoutes';
import {authenticateToken} from "../middleware/authMiddleware";

class UserRoutes implements IRoutes {
    public router: Router = Router();
    private userService: UserService = new UserService(new UserRepositoryImpl())
    private userController: UserController = new UserController(this.userService);

    constructor() {
        this.initializeRoutes();
    };

    initializeRoutes() {
        this.router.post('/user/register', this.userController.register);
        this.router.post('/user/auth', this.userController.auth);
        this.router.get('/user/:user_id', authenticateToken, this.userController.getUserById);
        this.router.delete('/user', authenticateToken, this.userController.deleteUser);
        this.router.get('/users', authenticateToken, this.userController.getUsers);
    };
}

export default UserRoutes;