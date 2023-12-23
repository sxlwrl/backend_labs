import {Router} from 'express';

import {getHealthcheck} from "../infrastructure/controllers/HealthcheckController";
import IRoutes from './routes-interfaces/IRoutes';

class HealthcheckRoutes implements IRoutes {
    public router: Router = Router();

    constructor() {
        this.initializeRoutes();
    };

    initializeRoutes() {
        this.router.get('/healthcheck', getHealthcheck);
    };
}

export default HealthcheckRoutes;