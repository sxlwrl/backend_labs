export class Category {
    constructor(private _categoryName: string) {};

    get getCategoryName(): string {
        return this._categoryName;
    };
}