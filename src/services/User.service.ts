import {IUserRepository} from "../repositories/IUserRepository";
import {CreateUserDto} from "../dto/User/CreateUser.dto";

export class UserService {
    constructor(private readonly _userRepository: IUserRepository) {};

    createUser(data: CreateUserDto) {
        return this._userRepository.createUser(data);
    };
}