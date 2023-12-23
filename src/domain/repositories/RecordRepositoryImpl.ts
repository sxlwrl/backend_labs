import {IRecordRepository} from './interfaces/IRecordRepository';
import {Record} from '../entities/Record';
import {RecordModel} from "../../infrastructure/models/RecordModel";
import {UserModel} from "../../infrastructure/models/UserModel";
import {CurrencyModel} from "../../infrastructure/models/CurrencyModel";
import {ApiError} from "../../errors/API.error";

export class RecordRepositoryImpl implements IRecordRepository {
    private async checkRecordExistence(id: number): Promise<void> {
        if (!await RecordModel.findByPk(id)) {
            throw new ApiError('Record is not found');
        }
    };

    private async checkCurrencyExistence(currency: string | undefined): Promise<void> {
        const currencyExists = await CurrencyModel.findOne({where: {currencyName: currency}});

        if (!currencyExists) {
            throw new ApiError('This currency is not allowed');
        }
    };

    async getById(id: number): Promise<RecordModel> {
        await this.checkRecordExistence(id);
        return await RecordModel.findByPk(id) as RecordModel;
    };

    async delete(id: number): Promise<void> {
        await this.checkRecordExistence(id);
        const category = await RecordModel.findByPk(id) as RecordModel;
        await category.destroy();
    };

    private async getUser(userId: number): Promise<UserModel | null> {
        return await UserModel.findOne({where: {id: userId}});
    };

    async create(record: Record): Promise<RecordModel> {

        const user = await this.getUser(record.getUserId);
        const defaultCurrency = user?.dataValues.defaultCurrency;

        if (record.getCurrency) {
            await this.checkCurrencyExistence(record.getCurrency);
        }


        try {
            return await RecordModel.create({
                userId: record.getUserId,
                categoryId: record.getCategoryId,
                date: record.getDate,
                costs: record.getCosts,
                currency: record.getCurrency || defaultCurrency
            });
        } catch (err) {
            throw new ApiError(`Cannot create a new record`);
        }
    };

    async getFiltered(user_id: number | undefined, category_id: number | undefined) {
        const whereCondition: { [key: string]: any } = {};
        if (user_id) whereCondition.userId = user_id;
        if (category_id) whereCondition.categoryId = category_id;
        return RecordModel.findAll({where: whereCondition});
    };
}