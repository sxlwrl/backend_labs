import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import IRoutes from './routes/routes-interfaces/IRoutes';

import dotenv from 'dotenv';

dotenv.config();

export default class {
    private app: express.Application;
    private PORT = process.env.PORT || 3000;

    constructor(routes: IRoutes[]) {
        this.app = express();

        this.initMiddlewares();
        this.initRoutes(routes);

        this.handle404();
    };

    public listen(): void {
        this.app.listen(this.PORT, () => {
            console.log(`Server is listening on the port: ${this.PORT}`);
        });
    };

    private initMiddlewares(): void {
        this.app.use(json());
    };

    private handle404() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).send('Not found');
            next();
        });
    };

    private initRoutes(routes: IRoutes[]): void {
        routes.forEach((routerItem) => this.app.use('/', routerItem.router));
    };
}
