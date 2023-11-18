import {Router} from 'express';

import {RecordRepositoryImpl} from '../repositories/RecordRepositoryImpl';
import {RecordController} from '../controllers/RecordController';
import {RecordService} from '../services/RecordService';

import IRoutes from './routes-interfaces/IRoutes';

class UserRoutes implements IRoutes {
    public router: Router = Router();
    private recordService: RecordService = new RecordService(new RecordRepositoryImpl())
    private recordController: RecordController = new RecordController(this.recordService);

    constructor() {
        this.initializeRoutes();
    };

    initializeRoutes() {
        this.router.get('/record/:record_id', this.recordController.getRecordById);
        this.router.delete('/record/:record_id', this.recordController.deleteRecord);
        this.router.post('/record', this.recordController.createRecord);
        this.router.get('/record', this.recordController.getRecordFiltered);
    };
}

export default UserRoutes;