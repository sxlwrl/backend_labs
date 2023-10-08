import express, {Request, Response, NextFunction} from 'express';
import {json} from "body-parser";

class App {
    public app: express.Application;

    constructor(controllers: any[]) {
        this.app = express();

        this.initMiddlewares();
        this.initRoutes(controllers);

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).json({code: 404, status: 'Not Found'});
            next();
        });
    };

    public listen(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server listening on the port: ${process.env.PORT}`);
        });
    };

    private initMiddlewares(): void {
        this.app.use(json());
    };

    private initRoutes(routes: any[]): void {
        routes.forEach(routerItem => this.app.use('/', new routerItem().router));
    };
}

export default App;