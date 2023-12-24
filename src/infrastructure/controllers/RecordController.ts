import { RequestHandler } from 'express';
import { RecordService } from '../../domain/services/RecordService';
import {ApiError} from "../../errors/API.error";

export class RecordController {
    constructor(private readonly _service: RecordService) {}

    public getRecordById: RequestHandler = async (req, res) => {
        const recordId = Number(req.params.record_id);

        try {
            const category = await this._service.getById(recordId);

            return res
                .status(200)
                .json({message: 'Record has been found', category: category});
        } catch (err) {
            return res
                .status(404)
                .json({status: 404, message: 'Record is not existed'});
        }
    };

    public deleteRecord: RequestHandler = async (req, res) => {
        const recordId = Number(req.params.record_id);

        try {
            const record = await this._service.getById(recordId);

            if (record.userId !== req.body._userId) {
                return res.status(403).json('You cannot delete this');
            }
            await this._service.delete(recordId);

            return res
                .status(200)
                .json({status: res.statusCode, message: 'Record has been deleted!'});
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({status: res.statusCode, message: `${err.message}`});
            }
        }
    };

    public createRecord: RequestHandler = async (req, res) => {
        try {
            const record = await this._service.create(req.body);

            return res.status(201).json({ record: record });
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({status: 404, message: `${ err.message }`});
            }
        }
    };

    public getRecordFiltered: RequestHandler = async (req, res) => {
        const {user_id, category_id} = req.query as {
            user_id?: number;
            category_id?: number;
        };

        if (!user_id && !category_id) {
            return res.status(404).send('There is no user ID and category ID');
        }

        try {
            const records = await this._service.getFiltered(
                user_id,
                category_id,
            );

            return res.status(200).json({records: records});
        } catch (err) {
            if (err instanceof ApiError) {
                return res
                    .status(404)
                    .json({status: 404, message: `${ err.message }`});
            }
        }
    };
}
