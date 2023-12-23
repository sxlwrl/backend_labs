import App from './application/app.ts';

import HealthcheckRoutes from './routes/HealthcheckRoutes.ts';
import userRoutes from './routes/UserRoutes.ts';
import categoryRoutes from "./routes/CategoryRoutes.ts";
import recordRoutes from "./routes/RecordRoutes.ts";

import {sequelize} from "./infrastructure/database/sequelize.ts";
import {CurrencyModel} from "./infrastructure/models/CurrencyModel.ts";

const app = new App([new HealthcheckRoutes(), new userRoutes(), new categoryRoutes(), new recordRoutes()]);

async function startServer() {
    try {
        // await sequelize.sync({ force: true });
        // await sequelize.sync();
        if (await CurrencyModel.count() === 0) {
            const currencies = [
                {currencyName: 'UAH'},
                {currencyName: 'EUR'},
                {currencyName: 'USD'},
                {currencyName: 'GBP'}
            ];

            await CurrencyModel.bulkCreate(currencies);
        }

        app.listen();
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}

(async () => await startServer())();

