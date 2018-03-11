import Card from './Card';

export default class {
  constructor(cards = [], size = 9) {
    this.cards = cards;
    this.size = size;
    this.set = new Set();
    this.clicked = null;
    this.score = 0;
  }

  getCards() {
    return this.cards;
  }

  getSize() {
    return this.size;
  }

  getSet() {
    return this.set;
  }

  getClicked() {
    return this.clicked;
  }

  getScore() {
    return this.score;
  }

  setClicked(card) {
    this.clicked = card;
  }

  setScore(n) {
    this.score = n;
  }

  shuffle(fn) {
    this.cards.sort(fn);
  }

  deal(fn) {
    while (this.set.size < this.size) {
      const num = fn();
      this.set.add(num);
    }
    this.cards = Array.from(this.set).concat(Array.from(this.set));
  }

  putOnTable() {
    this.cards = this.cards.map((val, ind) => new Card(val, ind));
  }
}
