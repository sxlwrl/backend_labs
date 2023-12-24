import {Record} from "../../entities/Record";
import {RecordModel} from "../../../infrastructure/models/RecordModel";
import {IRepository} from "./IRepository";

export interface IRecordRepository extends IRepository<Record, RecordModel> {
    create(entity: Record): Promise<RecordModel>;
    getFiltered(user_id: number | undefined, category_id: number | undefined): Promise<Array<RecordModel>>;
}