export class User {
  constructor(public email: string, public id: string, public accountsId: string[] = []) {}
}
