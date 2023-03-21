export class Account {
  public id: string;

  constructor(public name: string, public password: string, public usersId: string[]) {}
}