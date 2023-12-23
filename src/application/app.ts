import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { json } from 'body-parser';
import IRoutes from '../routes/routes-interfaces/IRoutes';

import dotenv from 'dotenv';

dotenv.config();

export default class {
    private app: express.Application;
    private PORT = process.env.PORT || 4000;

    constructor(routes: IRoutes[]) {
        this.app = express();

        this.initMiddlewares();
        this.initRoutes(routes);

        this.handleError();
    };

    public listen(): void {
        this.app.listen(this.PORT, () => {
            console.info(`Server is listening on the port: ${this.PORT}`);
        });
    };

    private initMiddlewares(): void {
        this.app.use(json());
    };

    private handleError() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).json({status: res.statusCode, message: 'Not found'});
            next();
        });
    };

    private initRoutes(routes: IRoutes[]): void {
        routes.forEach((routerItem) => this.app.use('/', routerItem.router));
    };
}
