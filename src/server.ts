import App from './app';
import 'dotenv/config';
import userRoutes from "./routes/User.routes";

const app = new App([userRoutes]);

app.listen();