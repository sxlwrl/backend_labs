import { Record } from '../../entities/Record';
import { CreateRecordDto } from '../../dto/CreateRecord.dto';
import { IRepository } from './IRepository';

export interface IRecordRepository extends IRepository<Record, CreateRecordDto> {
    getFiltered(user_id: string | undefined, category_id: string | undefined): Array<Record>;
}