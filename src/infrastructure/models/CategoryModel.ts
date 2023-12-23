import {DataTypes, Optional, Model} from 'sequelize';

import {sequelize} from "../database/sequelize";

interface CategoryAttributes {
    id: number;
    categoryName: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {
}

export class CategoryModel extends Model<CategoryAttributes, CategoryCreationAttributes> {
    declare id: number;
    declare categoryName: string;
}

CategoryModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    tableName: 'categories',
    modelName: 'category'
});

