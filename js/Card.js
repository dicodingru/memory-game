export default class {
  constructor(num, index) {
    this.num = num; // Card rank (picture name)
    this.index = index; // Order number on the table
  }

  getNum() {
    return this.num;
  }

  getIndex() {
    return this.index;
  }
}
