import { Sequelize } from 'sequelize-typescript';
import { config } from '../../../config/config';

export const sequelize = new Sequelize(config);