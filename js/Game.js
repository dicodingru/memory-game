import Card from './Card';

const defaultSize = 9;

export default class {
  constructor(cards = [], size = defaultSize) {
    this.cards = cards; // All cards in a game including duplicates
    this.size = size; // Amount of uniq cards
    this.set = new Set(); // Numbers of uniq cards left on the table
    this.clicked = null; // The card laid faceup at the moment
    this.score = 0; // Current scores
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

  // When dealt every card becomes a number
  deal(fn) {
    while (this.set.size < this.size) {
      const num = fn();
      this.set.add(num);
    }
    this.cards = Array.from(this.set).concat(Array.from(this.set));
  }

  // When put on the table a card becomes
  // an instance of <Card> class with relevant properties
  putOnTable() {
    this.cards = this.cards.map((val, ind) => new Card(val, ind));
  }
}
