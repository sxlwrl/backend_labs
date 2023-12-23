export class Record {
    constructor(private _userId: number, private _categoryId: number, private _date: Date, private _costs: number, private _currency: string | undefined) {};

    get getUserId(): number {
        return this._userId;
    };

    get getCategoryId(): number {
        return this._categoryId;
    };

    get getDate(): Date {
        return this._date;
    };

    get getCosts(): number {
        return this._costs;
    };

    get getCurrency(): string | undefined {
        return this._currency;
    };
}