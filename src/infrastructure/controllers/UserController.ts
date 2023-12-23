import {UserService} from '../../domain/services/UserService';
import {RequestHandler} from 'express';
import checkObjectType from '../../utils/checkObjectType';
import {ApiError} from "../../errors/API.error";

export class UserController {
    constructor(private _service: UserService) {}

    getUserById: RequestHandler = async (req, res) => {
        const userId = Number(req.params.user_id);

        try {
            const user = await this._service.getById(userId);

            return res
                .status(200)
                .json({status: res.statusCode, message: 'User has been found', user: user});
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({status: res.statusCode, message: `${err.message}`});
            }
        }
    };

    deleteUser: RequestHandler = async (req, res) => {
        const userId = Number(req.params.user_id);

        try {
            await this._service.delete(userId);
            return res
                .status(200)
                .json({message: 'User has been deleted!'});
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({status: res.statusCode, message: `${err.message}`});
            }
        }
    };

    createUser: RequestHandler = async (req, res) => {
        const {username} = req.body;

        if (!username || checkObjectType(username)) {
            return res
                .status(400)
                .json({status: res.statusCode, message: 'Invalid username!'});
        }

        try {
            const user = await this._service.create(req.body);
            return res.status(201).json({user: user});
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({status: res.statusCode, message: `${err.message}`});
            }
        }
    };

    getUsers: RequestHandler = async (req, res) => {
        try {
            const allUsers = await this._service.getUsers();
            return res
                .status(200)
                .json({users: allUsers});
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({status: res.statusCode, message: `${err.message}`});
            }
        }
    };
}
