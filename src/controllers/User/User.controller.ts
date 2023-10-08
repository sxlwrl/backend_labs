import {RequestHandler} from "express";
import {UserService} from "../../services/User.service";
import checkObjectType from "../../utils/checkObjectType";

export class UserController {
    constructor(private readonly _userService: UserService) {}

    public createUser: RequestHandler = (req, res) => {
        const data = req.body;

        if (!data.username || checkObjectType(data.username)) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        const newUser = this._userService.createUser(data);

        return res.status(201).json({message: 'User has been created', user: newUser});
    };
}