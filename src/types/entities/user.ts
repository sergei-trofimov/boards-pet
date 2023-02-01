/* eslint-disable @typescript-eslint/no-empty-function */
export class User {
  // temporary as any
  public boards: any[] = [];

  constructor(public email: string, public id: string) {}
}
