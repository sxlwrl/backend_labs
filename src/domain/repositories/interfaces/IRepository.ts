/**
 * E - Entity
 * M - Model
 */

export interface IRepository<E, M> {
    getById(id: number): Promise<M>;

    delete(id: number): Promise<void>;

    create(entity: E): Promise<M>;
}