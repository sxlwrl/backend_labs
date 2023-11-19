import { IRecordRepository } from './interfaces/IRecordRepository';
import { Record } from '../entities/Record';

import { RepositoryImpl } from './RepositoryImpl';

export class RecordRepositoryImpl extends RepositoryImpl<Record> implements IRecordRepository {
    getFiltered(userId: string | undefined, categoryId: string | undefined) {
        if (!categoryId) {
            return this._data.filter(record => record.userId === userId);
        }
        else if (!userId) {
            return this._data.filter(record => record.categoryId === categoryId);
        }
        else {
            return this._data.filter(record => record.userId === userId && record.categoryId === categoryId);
        }
    }
}
