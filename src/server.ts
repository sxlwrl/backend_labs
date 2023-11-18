import App from './app';
import userRoutes from './routes/UserRoutes';
import categoryRoutes from './routes/CategoryRoutes';
import recordRoutes from './routes/RecordRoutes';
import HealthcheckRoutes from './routes/HealthcheckRoutes';

const app = new App([new HealthcheckRoutes(), new userRoutes(), new categoryRoutes(), new recordRoutes()]);

app.listen();
