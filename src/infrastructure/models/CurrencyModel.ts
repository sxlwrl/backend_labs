import {DataTypes, Optional, Model} from 'sequelize';
import {sequelize} from "../database/sequelize";

interface CurrencyAttributes {
    id: number;
    currencyName: string;
}

interface CurrencyCreationAttributes extends Optional<CurrencyAttributes, 'id'> {
}

export class CurrencyModel extends Model<CurrencyAttributes, CurrencyCreationAttributes> {
    declare id: number;
    declare currencyName: string;
}

CurrencyModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    currencyName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'currencies',
    modelName: 'currency'
});


