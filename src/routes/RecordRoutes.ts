import {Router} from 'express';
import {body} from 'express-validator';

import {RecordRepositoryImpl} from "../domain/repositories/RecordRepositoryImpl";
import {RecordController} from "../infrastructure/controllers/RecordController";
import {RecordService} from '../domain/services/RecordService';

import IRoutes from './routes-interfaces/IRoutes';
import {checkValidation} from "../middleware/checkValidation.middleware";
import {authenticateToken} from "../middleware/authMiddleware";

class UserRoutes implements IRoutes {
    public router: Router = Router();
    private recordService: RecordService = new RecordService(new RecordRepositoryImpl())
    private recordController: RecordController = new RecordController(this.recordService);

    constructor() {
        this.initializeRoutes();
    };

    initializeRoutes() {
        this.router.get('/record/:record_id', authenticateToken, this.recordController.getRecordById);
        this.router.delete('/record/:record_id', authenticateToken, this.recordController.deleteRecord);
        this.router.post('/record', authenticateToken, [body(['userId', 'categoryId']).custom(value => {
            return typeof value === 'number' && value >= 1;
        })], checkValidation ,this.recordController.createRecord);
        this.router.get('/record', authenticateToken, this.recordController.getRecordFiltered);
    };
}

export default UserRoutes;