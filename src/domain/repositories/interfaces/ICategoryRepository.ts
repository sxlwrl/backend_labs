import {Category} from "../../entities/Category";
import {CategoryModel} from "../../../infrastructure/models/CategoryModel";
import {IRepository} from "./IRepository";

export interface ICategoryRepository extends IRepository<Category, CategoryModel> {}