import { IUserRepository } from '../repositories/User/IUserRepository';
import { CreateUserDto } from '../dto/CreateUser.dto';

export class UserService {
    constructor(private readonly _userRepository: IUserRepository) {}

    public getUserById(id: string) {
        return this._userRepository.getUserById(id);
    };

    public deleteUser(id: string) {
        return this._userRepository.deleteUser(id);
    };

    public createUser(data: CreateUserDto) {
        return this._userRepository.createUser(data);
    };

    public getUsers() {
        return this._userRepository.getUsers();
    };
}
