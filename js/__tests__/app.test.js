import Card from '../Card';
import Game from '../Game';

describe('Actions with cards', () => {
  it('Create card', () => {
    const data = new Card(1);
    expect(data.getNum()).toBe(1);
  });

  it('Shuffle cards and start game', () => {
    const game = new Game([1, 2, 3, 4, 5, 6], 3);

    game.shuffle(() => 1);
    expect(game.getCards()).toEqual([6, 5, 4, 3, 2, 1]);

    game.deal(() => game.set.size);
    expect(game.getCards().length).toBe(6);
    expect(game.getCards()[0]).toBe(0);

    game.putOnTable();
    expect(game.getCards()[1] instanceof Card).toBe(true);
  });
});
