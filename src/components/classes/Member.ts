export class Member {
  name: string;
  sex: string;
  age: number;
  prefecture: string;
  mail: string;
  password: string;
  favorites: Array<string>;

  constructor() {
    this.name = "";
    this.sex = "1";
    this.age = 0;
    this.prefecture = "2";
    this.mail = "a@a.com";
    this.favorites = [];
    this.password = "";
  }
}
