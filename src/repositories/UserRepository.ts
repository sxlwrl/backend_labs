import {CreateUserDto} from "../dto/User/CreateUser.dto";
import {IUserRepository} from "./IUserRepository";
import {User} from "../entities/User/User";
import generateRandomId from "../utils/generateRandomId";

export class UserRepository implements IUserRepository {
    private _data: User[] = [];

    createUser(userData: CreateUserDto): User {
        const {username} = userData;
        const id = generateRandomId();

        const newUser: User = {id, username};
        this._data.push(newUser);

        return newUser;
    };
}