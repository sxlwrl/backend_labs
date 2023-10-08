import {Router} from 'express';

import {UserRepository} from "../repositories/UserRepository";
import {UserController} from "../controllers/User/User.controller";
import {UserService} from "../services/User.service";

class UserRoutes {
    public router: Router = Router();
    private userService: UserService = new UserService(new UserRepository())
    private userController: UserController = new UserController(this.userService);

    constructor() {
        this.initializeRoutes();
    };

    initializeRoutes() {
        this.router.post('/user', this.userController.createUser);
    };
}

export default UserRoutes;