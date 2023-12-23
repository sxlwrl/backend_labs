export class User {
    constructor(private _username: string, private _defaultCurrency?: string | undefined) {};

    get getUsername(): string {
        return this._username;
    };

    get getDefaultCurrency(): string | undefined {
        return this._defaultCurrency;
    };
}