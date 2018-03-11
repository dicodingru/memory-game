import Game from './Game';

const blockClicks = () => {
  document.getElementById('veil').style.display = 'block';
};
const unblockClicks = () => {
  document.getElementById('veil').style.display = 'none';
};

const hideCards = () => {
  [].forEach.call(document.getElementsByClassName('back'), (item) => {
    item.classList.remove('hide');
  });
};

const upScore = (game) => {
  const newScore = game.getScore() + (game.getSet().size * 42);
  game.setScore(newScore);
  document.getElementById('score').innerText = newScore;
};

const downScore = (game) => {
  const newScore = game.getScore() - ((game.getSize() - game.getSet().size) * 42);
  game.setScore(newScore);
  document.getElementById('score').innerText = newScore;
};

const finish = (game) => {
  document.getElementById('result').innerText = `Ваш итоговый счет: ${game.getScore()}`;
  document.getElementsByClassName('main')[0].style.marginLeft = '-1530px';
};

const render = (game) => {
  game.getCards().forEach((el, ind) => {
    const node = document.createElement('div');
    node.setAttribute('data-tid', 'Card');
    node.classList.add('card');

    const face = document.createElement('img');
    face.setAttribute('src', `./assets/cards/${el.getNum()}.png`);

    const back = document.createElement('img');
    back.setAttribute('src', './assets/cards/back.png');
    back.setAttribute('id', `${ind}`);
    back.classList.add('back');
    back.classList.add('hide');

    back.addEventListener('click', (e) => {
      blockClicks();

      const index = e.target.getAttribute('id');
      const current = game.getCards()[index];
      const clicked = game.getClicked();

      if (!game.getSet().has(current.getNum())) {
        unblockClicks();
        return;
      }

      if (clicked === null) {
        game.setClicked(current);
        e.target.classList.add('hide');
        unblockClicks();
        return;
      }

      if (clicked === current) {
        game.setClicked(null);
        e.target.classList.remove('hide');
        unblockClicks();
        return;
      }

      if (clicked.getNum() === current.getNum()) {
        game.setClicked(null);
        upScore(game);
        game.getSet().delete(current.getNum());
        e.target.classList.add('hide');
        setTimeout(() => {
          blockClicks();
          document.getElementById(index).parentElement.style.visibility = 'hidden';
          document.getElementById(clicked.getIndex()).parentElement.style.visibility = 'hidden';
          unblockClicks();
        }, 500);
        if (game.getSet().size === 0) {
          finish(game);
        }
        return;
      }

      e.target.classList.add('hide');
      setTimeout(() => {
        game.setClicked(null);
        e.target.classList.remove('hide');
        document.getElementById(clicked.getIndex()).classList.remove('hide');
        downScore(game);
        unblockClicks();
      }, 500);
    });

    node.appendChild(face);
    node.appendChild(back);

    const targetRow = `row${Math.floor(ind / 6) + 1}`;
    document.getElementsByClassName(targetRow)[0].appendChild(node);
  });
};

const start = (game) => {
  game.setScore(0);
  game.deal(() => (Math.floor(52 * Math.random()) + 1));
  game.shuffle(() => (2 * Math.random()) - 1);
  game.putOnTable();

  setTimeout(() => {
    render(game);
  }, 500);

  setTimeout(() => {
    hideCards();
    unblockClicks();
  }, 3000);
};

const kill = () => {
  document.getElementsByClassName('row1')[0].innerHTML = '';
  document.getElementsByClassName('row2')[0].innerHTML = '';
  document.getElementsByClassName('row3')[0].innerHTML = '';
  document.getElementById('score').innerText = '0';
};

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game([], 9);
  start(game);

  document.getElementById('new-game-button').addEventListener('click', () => {
    document.getElementsByClassName('main')[0].style.marginLeft = '-700px';
  });

  document.getElementById('restart-game').addEventListener('click', () => {
    blockClicks();
    kill();
    start(game);
  });

  document.getElementById('one-more').addEventListener('click', () => {
    blockClicks();
    kill();
    start(game);
    document.getElementsByClassName('main')[0].style.marginLeft = '-700px';
  });

  document.getElementById('hack').addEventListener('click', () => {
    finish(game);
  });
}, false);
