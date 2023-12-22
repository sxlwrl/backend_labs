import {IUserRepository} from '../repositories/interfaces/IUserRepository';
import {CreateUserDto} from '../../dto/CreateUser.dto';
import {User} from '../entities/User';

export class UserService {
    constructor(private readonly _repository: IUserRepository) {};

    async getById(id: number) {
        return this._repository.getById(id);
    };

    async delete(id: number) {
        return this._repository.delete(id);
    }

    async create(data: CreateUserDto) {
        let {username, defaultCurrency = 'UAH' } = data;

        const user = new User(username, defaultCurrency);

        return this._repository.create(user);
    }

    async getUsers() {
        return this._repository.getUsers();
    };
}
