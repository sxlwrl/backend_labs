import App from './app';
import userRoutes from './routes/UserRoutes';
import categoryRoutes from './routes/CategoryRoutes';
import recordRoutes from './routes/RecordRoutes';

const app = new App([new userRoutes(), new categoryRoutes(), new recordRoutes()]);

app.listen();
