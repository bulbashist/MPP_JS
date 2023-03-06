import { IUser } from "../types";

export class UserStorage {
  private _users: IUser[];

  constructor() {
    this._users = [
      {
        login: "login",
        password: "password",
      },
      {
        login: "1",
        password: "1",
      },
    ];
  }

  public getUser(login: string) {
    const user = this._users.find((user) => user.login === login);
    return user;
  }
}
