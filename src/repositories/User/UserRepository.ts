import {CreateUserDto} from "../../dto/CreateUser.dto";
import {IUserRepository} from "./IUserRepository";
import {User} from "../../entities/User";
import generateRandomId from "../../utils/generateRandomId";

export class UserRepository implements IUserRepository {
    private _data: User[] = [];

    getUserById(id: string) {
        return this._data.find((user) => user.id === id);
    };

    deleteUser(id: string) {
        this._data = this._data.filter((user) => user.id !== id);
    };

    createUser(userData: CreateUserDto) {
        const { username } = userData;
        const id = generateRandomId();

        const newUser: User = { id, username };
        this._data.push(newUser);

        return newUser;
    };

    getUsers() {
        return this._data;
    }
}