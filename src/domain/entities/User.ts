export class User {
    constructor(private _username: string) {};

    get getUsername(): string {
        return this._username;
    };
}