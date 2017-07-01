export class Customer {
  constructor (private _name: string, private _email: string) {
  }

  get email (): string {
    return this._email;
  }

  set email (value: string) {
    this._email = value;
  }

  get name (): string {
    return this._name;
  }

  set name (value: string) {
    this._name = value;
  }
}
