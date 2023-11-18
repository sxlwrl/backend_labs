import generateRandomId from '../utils/generateRandomId';

export abstract class RepositoryImpl<T extends { id?: string }> {
    protected _data: Array<T> = [];

    getById(id: string) {
        return this._data.find(item => item?.id === id);
    };

    delete(id: string) {
        this._data = this._data.filter(item => item.id !== id);
    };

    create(item: T) {
        const id = generateRandomId();

        const newItem = { id, ...item };
        this._data.push(newItem);

        return newItem;
    };
}
