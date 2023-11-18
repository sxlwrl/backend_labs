import { IUserRepository } from './interfaces/IUserRepository';
import { User } from '../entities/User';

import { RepositoryImpl } from './RepositoryImpl';

export class UserRepositoryImpl extends RepositoryImpl<User> implements IUserRepository {
    getUsers() {
        return this._data;
    };
}
