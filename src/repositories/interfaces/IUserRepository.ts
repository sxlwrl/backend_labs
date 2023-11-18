import { User } from '../../entities/User';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { IRepository } from './IRepository';

export interface IUserRepository extends IRepository<User, CreateUserDto> {
    getUsers(): Array<User>;
}