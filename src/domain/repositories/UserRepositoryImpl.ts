import {IUserRepository} from './interfaces/IUserRepository';
import {User} from '../entities/User';
import {UserModel} from "../../infrastructure/models/UserModel";
import {CurrencyModel} from "../../infrastructure/models/CurrencyModel";
import {ApiError} from "../../errors/API.error";

export class UserRepositoryImpl implements IUserRepository {
    private async checkUserExistence(id: number): Promise<void> {
        if (!await UserModel.findByPk(id)) {
            throw new ApiError('There is not user with the described id!');
        }
    };

    async getById(id: number): Promise<UserModel> {
        await this.checkUserExistence(id);
        return await UserModel.findByPk(id) as UserModel;
    };

    async delete(id: number): Promise<void> {
        try {
            await this.checkUserExistence(id);
            const user = await UserModel.findByPk(id) as UserModel;
            await user.destroy();
        } catch (err) {
            throw new ApiError('Cannot delete this user!')
        }
    };

    async create(user: User): Promise<UserModel> {
        const currencyObj = await CurrencyModel.findOne({where: {currencyName: user.getDefaultCurrency}})

        if (!currencyObj) {
            throw new ApiError('Invalid default currency!');
        }

        return UserModel.create({
            username: user.getUsername,
            defaultCurrency: user.getDefaultCurrency,
        })
    };

    async getUsers(): Promise<UserModel[]> {
        try {
            return UserModel.findAll();
        } catch(err) {
            throw new ApiError(`Cannot fetch all users!`);
        }
    };
}

