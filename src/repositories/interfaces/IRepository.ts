export interface IRepository<T, D> {
    getById(id: string): T | undefined;
    create(dto: D): T;
    delete(id: string): void;
}