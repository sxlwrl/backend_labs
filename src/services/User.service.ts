import { IUserRepository } from '../repositories/interfaces/IUser.repository';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { Service } from './Service';
import { User } from '../entities/User';

export class UserService extends Service<User, CreateUserDto>{
    constructor(private readonly _userRepository: IUserRepository) {
        super(_userRepository);
    };

    public getUsers() {
        return this._userRepository.getUsers();
    };
}
