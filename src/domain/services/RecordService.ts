import {IRecordRepository} from "../repositories/interfaces/IRecordRepository";
import {CreateRecordDto} from "../../dto/CreateRecord.dto";
import {Record} from "../entities/Record";

export class RecordService {
    constructor(private readonly _repository: IRecordRepository) {};

    async getById(id: number) {
        return this._repository.getById(id);
    };

    async delete(id: number) {
        return this._repository.delete(id);
    }

    async create(data: CreateRecordDto) {
        const {userId, categoryId, date, costs, currency} = data;

        const record = new Record(userId, categoryId, date, costs, currency);

        return this._repository.create(record);
    }

    async getFiltered(user_id: number | undefined, category_id: number | undefined) {
        return this._repository.getFiltered(user_id, category_id);
    }
}
