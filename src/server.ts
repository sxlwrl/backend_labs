import App from './app';
import userRoutes from './routes/User.routes';
import categoryRoutes from './routes/Category.routes';

const app = new App([new userRoutes(), new categoryRoutes()]);

app.listen();
