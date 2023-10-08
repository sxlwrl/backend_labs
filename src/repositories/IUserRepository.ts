import {User} from "../entities/User/User";
import {CreateUserDto} from "../dto/User/CreateUser.dto";

export interface IUserRepository {
    createUser(dto: CreateUserDto): User;
}