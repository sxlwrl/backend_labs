import {Optional, Model, DataTypes} from 'sequelize';

import {UserModel} from "./UserModel";
import {CategoryModel} from "./CategoryModel";
import {sequelize} from "../database/sequelize";

interface RecordAttributes {
    id: number;
    userId?: number;
    categoryId?: number;
    date: Date;
    costs: number;
    currency?: string;
}

interface RecordCreationAttributes extends Optional<RecordAttributes, 'id'> {}

export class RecordModel extends Model<RecordAttributes, RecordCreationAttributes> {
    declare id: number;
    declare userId: number;
    declare categoryId: number;
    declare date: Date;
    declare costs: number;
    declare currency?: string;
}

RecordModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    costs: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'records',
    modelName: 'record'
});


RecordModel.belongsTo(UserModel, {
    as: 'Users',
    foreignKey: 'userId',
});


UserModel.hasMany(RecordModel);

CategoryModel.hasMany(RecordModel);

RecordModel.belongsTo(CategoryModel);


