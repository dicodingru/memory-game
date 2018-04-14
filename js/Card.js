export default class {
  constructor(num, index) {
    this.num = num; // Card rank (picture name)
    this.index = index; // Order number on the table
  }

  // Render the card on the play table
  render() {
    const node = document.createElement('div');
    node.setAttribute('data-tid', 'Card');
    node.classList.add('card');

    const face = document.createElement('div');
    face.classList.add(`img-${this.num}`);

    const back = document.createElement('div');
    back.setAttribute('data-tid', 'Card-flipped');
    back.setAttribute('id', `${this.index}`);
    back.classList.add('img-53', 'back', 'hide');

    node.appendChild(face);
    node.appendChild(back);

    const targetRow = `row${Math.floor(this.index / 6) + 1}`;
    document.getElementsByClassName(targetRow)[0].appendChild(node);
  }
}
