import {DataTypes, Optional, Model} from "sequelize";
import {sequelize} from "../database/sequelize";
import {CurrencyModel} from "./CurrencyModel";

interface UserAttributes {
    id: number;
    username: string;
    defaultCurrency?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class UserModel extends Model<UserAttributes, UserCreationAttributes> {
    declare id: number;
    declare username: string;
    declare defaultCurrency?: string;
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    defaultCurrency: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'UAH'
    }
}, {
    sequelize,
    tableName: 'users',
    modelName: 'user'
});

UserModel.belongsTo(CurrencyModel, {
    foreignKey: 'defaultCurrency',
    constraints: false
});