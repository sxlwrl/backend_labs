import {UserService} from '../../domain/services/UserService';
import {RequestHandler} from 'express';
import checkObjectType from '../../utils/checkObjectType';
import {ApiError} from "../../errors/API.error";

export class UserController {
    constructor(private _service: UserService) {}

    register: RequestHandler = async (req, res) => {
        const {username} = req.body;

        if (!username || checkObjectType(username)) {
            return res
                .status(400)
                .json({status: res.statusCode, message: 'Invalid username!'});
        }

        try {
            const user = await this._service.register(req.body);
            return res.status(201).json({message: 'User has been registered', user: user});
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({status: res.statusCode, message: `${err.message}`});
            }
        }
    }

    auth: RequestHandler = async (req, res) => {
        const {username} = req.body;

        if (!username || checkObjectType(username)) {
            return res
                .status(400)
                .json({status: res.statusCode, message: 'Invalid username!'});
        }

        try {
            const token = await this._service.auth(req.body);

            res.header('Authorization', `Bearer ${token}`);



            return res.status(201).json({message: 'User has been logged in', token: token});
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({status: res.statusCode, message: `${err.message}`});
            }
        }
    }

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
            const user = await this._service.getById(userId);

            if (user.id !== req.body._userId) {
                return res.status(403).json('You cannot delete this');
            }

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
