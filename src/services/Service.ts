import { IRepository } from '../repositories/interfaces/IRepository';

export class Service<T, D> {
    constructor(private readonly _repository: IRepository<T, D>) {};

    public getById(id: string) {
        return this._repository.getById(id);
    };

    public create(data: D) {
        return this._repository.create(data);
    };

    public delete(id: string) {
        return this._repository.delete(id);
    };
}
