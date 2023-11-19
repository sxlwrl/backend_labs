import { RequestHandler } from 'express';
import checkObjectType from '../utils/checkObjectType';
import { CreateRecordDto } from '../dto/CreateRecord.dto';
import { RecordService } from '../services/RecordService';

export class RecordController {
    constructor(private readonly _recordService: RecordService) {}

    public getRecordById: RequestHandler = (req, res) => {
        const recordId = req.params.record_id;
        const record = this._recordService.getById(recordId);

        if (!record) {
            return res.status(404).send('Record not found');
        }

        res.status(200).json({
            message: 'Record has been found',
            record: record,
        });
    };

    public deleteRecord: RequestHandler = (req, res) => {
        const recordId = req.params.record_id;
        const record = this._recordService.getById(recordId);

        if (!record) {
            return res.status(404).send('Record not found');
        }

        this._recordService.delete(recordId);

        return res.status(200).json({ message: 'Record has been deleted' });
    };

    public createRecord: RequestHandler = (req, res) => {
        const data = req.body as CreateRecordDto;

        if (!data.costs || !data.userId || !data.categoryId) {
            return res.status(400).send('Invalid data');
        }

        const newRecord = this._recordService.create(data);

        return res
            .status(201)
            .json({ message: 'Record has been created', record: newRecord });
    };

    public getRecordFiltered: RequestHandler = (req, res) => {
        const { user_id, category_id } = req.query as {
            user_id?: string;
            category_id?: string;
        };

        if (!user_id && !category_id) {
            return res.status(404).send('There is no user ID and category ID');
        }

        const records = this._recordService.getRecordFiltered(
            user_id,
            category_id,
        );

        return res.status(200).json({ records: records });
    };
}
