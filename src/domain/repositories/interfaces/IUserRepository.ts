import {User} from '../../entities/User';
import {UserModel} from "../../../infrastructure/models/UserModel";
import {IRepository} from "./IRepository";
import {UserDto} from "../../../dto/User.dto";

export interface IUserRepository extends IRepository<User, UserModel> {
    register(user: User): Promise<UserModel>;
    auth(data: UserDto): Promise<string>;
    getUsers(): Promise<Array<UserModel>>;
}