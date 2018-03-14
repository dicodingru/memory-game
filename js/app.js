import Game from './Game';

// Prevent click events on cards
const blockClicks = () => {
  document.getElementById('veil').style.display = 'block';
};

// Allow click events on cards
const unblockClicks = () => {
  document.getElementById('veil').style.display = 'none';
};

// Hide all cards
const hideCards = () => {
  [].forEach.call(document.getElementsByClassName('back'), (item) => {
    item.classList.remove('hide');
  });
};

// Finish the game and show the result
const finish = (game) => {
  document.getElementById('result').innerText = `${game.score}`;
  document.getElementById('end').style.order = '1';
  document.getElementById('play').style.order = '2';
};

// Render the cards on the browser page
const render = (game) => {
  game.cards.forEach((el, ind) => {
    const node = document.createElement('div');
    node.setAttribute('data-tid', 'Card');
    node.classList.add('card');

    const face = document.createElement('img');
    face.setAttribute('src', `./assets/cards/${el.num}.png`);

    const back = document.createElement('img');
    back.setAttribute('src', './assets/cards/back.png');
    back.setAttribute('id', `${ind}`);
    back.setAttribute('data-tid', 'Card-flipped');
    back.classList.add('back');
    back.classList.add('hide');

    // Add click event listener on a card
    back.addEventListener('click', (e) => {
      blockClicks();

      const index = e.target.getAttribute('id');
      const current = game.cards[index];
      const { clicked } = game;

      if (!game.set.has(current.num)) {
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

      if (clicked.num === current.num) {
        game.setClicked(null);
        document.getElementById('score').innerText = game.upScore();
        game.set.delete(current.num);
        e.target.classList.add('hide');
        setTimeout(() => {
          blockClicks();
          document.getElementById(index).parentElement.classList.add('hide');
          document.getElementById(clicked.index).parentElement.classList.add('hide');
          unblockClicks();
        }, 500);
        if (game.set.size === 0) {
          finish(game);
        }
        return;
      }

      e.target.classList.add('hide');
      setTimeout(() => {
        game.setClicked(null);
        e.target.classList.remove('hide');
        document.getElementById(clicked.index).classList.remove('hide');
        document.getElementById('score').innerText = game.downScore();
        unblockClicks();
      }, 500);
    });

    node.appendChild(face);
    node.appendChild(back);

    const targetRow = `row${Math.floor(ind / 6) + 1}`;
    document.getElementsByClassName(targetRow)[0].appendChild(node);
  });
};

// Deal cards, shuffle the chosen ones and start a game
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
  }, 5000);
};

// Clear the playground
const clear = () => {
  document.getElementsByClassName('row1')[0].innerHTML = '';
  document.getElementsByClassName('row2')[0].innerHTML = '';
  document.getElementsByClassName('row3')[0].innerHTML = '';
  document.getElementById('score').innerText = '0';
};

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();

  // Start the game when "Start game" button is clicked
  document.getElementById('new-game').addEventListener('click', () => {
    start(game);
    document.getElementById('play').style.order = '1';
    document.getElementById('main').style.order = '2';
  });

  // Restart the game
  document.getElementById('restart-game').addEventListener('click', () => {
    blockClicks();
    clear();
    start(game);
  });

  // Play one more time after showing results
  document.getElementById('one-more').addEventListener('click', () => {
    blockClicks();
    clear();
    start(game);

    document.getElementById('play').style.order = '1';
    document.getElementById('end').style.order = '2';
  });

  // Temporary button for testing the interface
  // document.getElementById('hack').addEventListener('click', () => {
  //   finish(game);
  // });
}, false);
