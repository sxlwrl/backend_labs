import {Router} from 'express';

import {UserRepository} from "../repositories/User/UserRepository";
import {UserController} from "../controllers/User.controller";
import {UserService} from "../services/User.service";

import IRoutes from './routes-interfaces/IRoutes';

class UserRoutes implements IRoutes {
    public router: Router = Router();
    private userService: UserService = new UserService(new UserRepository())
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