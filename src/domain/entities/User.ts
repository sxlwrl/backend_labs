export class User {
    constructor(
        private _username: string,
        private _password: string,
        private _defaultCurrency?: string | undefined
    ) {};

    get getUsername(): string {
        return this._username;
    };

    get getPassword(): string {
        return this._password;
    };

    get getDefaultCurrency(): string | undefined {
        return this._defaultCurrency;
    };
}