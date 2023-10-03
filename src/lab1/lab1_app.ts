import express, {Request, Response, NextFunction} from 'express';
import {json} from "body-parser";
import router from "./routers/healthcheckRouter";


const app = express();
const PORT = 3000;

app.use(json());

app.use('/', router);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({code: 404, status: 'Not Found'});
    next();
});


app.listen(PORT, () => {
    console.log(`Server has been started on PORT: ${PORT}`);
});
