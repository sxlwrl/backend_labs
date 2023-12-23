import App from './app';

import HealthcheckRoutes from '../routes/HealthcheckRoutes';
import userRoutes from '../routes/UserRoutes';
import categoryRoutes from "../routes/CategoryRoutes";
import recordRoutes from "../routes/RecordRoutes";

import {sequelize} from "../infrastructure/database/sequelize";
import {CurrencyModel} from "../infrastructure/models/CurrencyModel";

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

