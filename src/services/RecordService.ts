import { IRecordRepository } from '../repositories/interfaces/IRecordRepository';
import { CreateRecordDto } from '../dto/CreateRecord.dto';
import { Service } from './Service';
import { Record } from '../entities/Record';

export class RecordService extends Service<Record, CreateRecordDto> {
    constructor(private readonly _recordRepository: IRecordRepository) {
        super(_recordRepository);
    }

    public getRecordFiltered(user_id: string, category_id: string) {
        return this._recordRepository.getFiltered(user_id, category_id);
    }
}
