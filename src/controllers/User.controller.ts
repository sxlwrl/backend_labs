import { RequestHandler } from 'express';
import { UserService } from '../services/User.service';
import checkObjectType from '../utils/checkObjectType';
import { CreateUserDto } from '../dto/CreateUser.dto';

export class UserController {
    constructor(private readonly _userService: UserService) {}

    public getUserById: RequestHandler = (req, res) => {
        const userId = req.params.user_id;
        const user = this._userService.getUserById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json({ message: 'User has been found', user: user });
    };

    public deleteUser: RequestHandler = (req, res) => {
        const userId = req.params.user_id;

        const user = this._userService.getUserById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        this._userService.deleteUser(userId);

        return res
            .status(200)
            .json({ message: 'User has been deleted' });
    };

    public createUser: RequestHandler = (req, res) => {
        const data = req.body as CreateUserDto;

        if (!data.username || checkObjectType(data.username)) {
            return res.status(400).send('Invalid username');
        }

        const newUser = this._userService.createUser(data);

        return res
            .status(201)
            .json({ message: 'User has been created', user: newUser });
    };

    public getUsers: RequestHandler = (req, res) => {
        const users = this._userService.getUsers();

        return res.status(200).json({ users: users });
    };
}
