import {IUserRepository} from '../repositories/interfaces/IUserRepository';
import {UserDto} from '../../dto/User.dto';
import {User} from '../entities/User';

export class UserService {
    constructor(private readonly _repository: IUserRepository) {};

    async register(data: UserDto) {
        const {username, password, defaultCurrency = 'UAH' } = data;

        const user = new User(username, password, defaultCurrency);

        return await this._repository.register(user);
    };

    async auth(data: UserDto) {
        return await this._repository.auth(data);
    }

    async getById(id: number) {
        return this._repository.getById(id);
    };

    async delete(id: number) {
        return this._repository.delete(id);
    };

    async getUsers() {
        return this._repository.getUsers();
    };
}
