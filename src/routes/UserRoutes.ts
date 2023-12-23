import {Router} from 'express';

import {UserRepositoryImpl} from "../domain/repositories/UserRepositoryImpl";
import {UserController} from "../infrastructure/controllers/UserController";
import {UserService} from "../domain/services/UserService";

import IRoutes from './routes-interfaces/IRoutes';

class UserRoutes implements IRoutes {
    public router: Router = Router();
    private userService: UserService = new UserService(new UserRepositoryImpl())
    private userController: UserController = new UserController(this.userService);

    constructor() {
        this.initializeRoutes();
    };

    initializeRoutes() {
        this.router.get('/user/:user_id', this.userController.getUserById);
        this.router.delete('/user/:user_id', this.userController.deleteUser);
        this.router.post('/user', this.userController.createUser);
        this.router.get('/users', this.userController.getUsers);
    };
}

export default UserRoutes;