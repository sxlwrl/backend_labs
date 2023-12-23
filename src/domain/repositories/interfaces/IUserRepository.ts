import {User} from '../../entities/User';
import {UserModel} from "../../../infrastructure/models/UserModel";
import {IRepository} from "./IRepository";

export interface IUserRepository extends IRepository<User, UserModel> {
    getUsers(): Promise<Array<UserModel>>;
}