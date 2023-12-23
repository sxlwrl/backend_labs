import { Sequelize } from 'sequelize-typescript';
import { config } from '../../../config/config.ts';

export const sequelize = new Sequelize(config);