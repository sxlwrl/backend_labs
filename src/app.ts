import express from 'express';
import {json} from "body-parser";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.initMiddlewares();
    };

    public listen(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server listening on the port: ${process.env.PORT}`);
        });
    };

    private initMiddlewares(): void {
        this.app.use(json());
    }
}

export default App;