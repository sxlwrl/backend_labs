import {User} from "../../entities/User";
import {CreateUserDto} from "../../dto/CreateUser.dto";

export interface IUserRepository {
    getUserById(id: string): User | undefined;
    deleteUser(id: string): void;
    createUser(dto: CreateUserDto): User;
    getUsers(): Array<User>;
}