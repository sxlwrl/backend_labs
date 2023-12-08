import App from './app';
import userRoutes from '../routes/UserRoutes';

import HealthcheckRoutes from '../routes/HealthcheckRoutes';

const app = new App([new HealthcheckRoutes(), new userRoutes()]);

app.listen();
