import {IUserRepository} from './interfaces/IUserRepository';
import {User} from '../entities/User';
import {UserModel} from "../../infrastructure/models/UserModel";
import {CurrencyModel} from "../../infrastructure/models/CurrencyModel";
import {ApiError} from "../../errors/API.error";
import {UserDto} from "../../dto/User.dto";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class UserRepositoryImpl implements IUserRepository {
    private async _checkUserExistence(id: number): Promise<void> {
        if (!await UserModel.findByPk(id)) {
            throw new ApiError('There is not user with the described id!');
        }
    };

    async getById(id: number): Promise<UserModel> {
        await this._checkUserExistence(id);
        return await UserModel.findByPk(id) as UserModel;
    };

    private async _getByName(username: string): Promise<UserModel> {
        const user = await UserModel.findOne({where: {username}});

        if (!user) {
            throw new ApiError('This user is not registered!');
        }

        return user;
    }

    async register(user: User): Promise<UserModel> {

        if (await UserModel.findOne({where: {username: user.getUsername}})) {
            throw new ApiError('A user with this nickname has already registered');
        }

        const hashedPassword = await bcrypt.hash(user.getPassword, 10);

        const currencyObj = await CurrencyModel.findOne({where: {currencyName: user.getDefaultCurrency}})

        if (!currencyObj) {
            throw new ApiError('Invalid default currency!');
        }

        return await UserModel.create({
            username: user.getUsername,
            password: hashedPassword,
            defaultCurrency: user.getDefaultCurrency,
        });
    }

    async auth(data: UserDto): Promise<string> {
        const {username, password} = data;

        const user = await this._getByName(username);

        const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);

        if (!isPasswordValid) {
            throw new ApiError('Invalid credentials!');
        }

        return jwt.sign({userId: user.dataValues.id}, `${process.env.SECRET_KEY}`, {expiresIn: '5d'});
    };

    async delete(id: number): Promise<void> {
        try {
            await this._checkUserExistence(id);
            const user = await UserModel.findByPk(id) as UserModel;
            await user.destroy();
        } catch (err) {
            throw new ApiError('Cannot delete this user!')
        }
    };

    async getUsers(): Promise<UserModel[]> {
        try {
            return UserModel.findAll();
        } catch (err) {
            throw new ApiError(`Cannot fetch all users!`);
        }
    };
}

