export class Account {
  public id: string;
  public boardsId: string[] = [];

  constructor(public name: string, public password: string, public usersId: string[]) {}
}
