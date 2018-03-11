(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(num, index) {
    _classCallCheck(this, _class);

    this.num = num; // Card rank (picture name)
    this.index = index; // Order number on the table
  }

  _createClass(_class, [{
    key: "getNum",
    value: function getNum() {
      return this.num;
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index;
    }
  }]);

  return _class;
}();

exports.default = _class;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultSize = 9;

var _class = function () {
  function _class() {
    var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSize;

    _classCallCheck(this, _class);

    this.cards = cards; // All cards in a game including duplicates
    this.size = size; // Amount of uniq cards
    this.set = new Set(); // Numbers of uniq cards left on the table
    this.clicked = null; // The card laid faceup at the moment
    this.score = 0; // Current scores
  }

  _createClass(_class, [{
    key: 'getCards',
    value: function getCards() {
      return this.cards;
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return this.size;
    }
  }, {
    key: 'getSet',
    value: function getSet() {
      return this.set;
    }
  }, {
    key: 'getClicked',
    value: function getClicked() {
      return this.clicked;
    }
  }, {
    key: 'getScore',
    value: function getScore() {
      return this.score;
    }
  }, {
    key: 'setClicked',
    value: function setClicked(card) {
      this.clicked = card;
    }
  }, {
    key: 'setScore',
    value: function setScore(n) {
      this.score = n;
    }
  }, {
    key: 'shuffle',
    value: function shuffle(fn) {
      this.cards.sort(fn);
    }

    // When dealt every card becomes a number

  }, {
    key: 'deal',
    value: function deal(fn) {
      while (this.set.size < this.size) {
        var num = fn();
        this.set.add(num);
      }
      this.cards = Array.from(this.set).concat(Array.from(this.set));
    }

    // When put on the table a card becomes
    // an instance of <Card> class with relevant properties

  }, {
    key: 'putOnTable',
    value: function putOnTable() {
      this.cards = this.cards.map(function (val, ind) {
        return new _Card2.default(val, ind);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

},{"./Card":1}],3:[function(require,module,exports){
'use strict';

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prevent click events on cards
var blockClicks = function blockClicks() {
  document.getElementById('veil').style.display = 'block';
};

// Allow click events on cards
var unblockClicks = function unblockClicks() {
  document.getElementById('veil').style.display = 'none';
};

// Hide all cards
var hideCards = function hideCards() {
  [].forEach.call(document.getElementsByClassName('back'), function (item) {
    item.classList.remove('hide');
  });
};

// Increase scores when second card chosen is the same
var upScore = function upScore(game) {
  var newScore = game.getScore() + game.getSet().size * 42;
  game.setScore(newScore);
  document.getElementById('score').innerText = newScore;
};

// Decrease scores when wrong second card is chosen
var downScore = function downScore(game) {
  var newScore = game.getScore() - (game.getSize() - game.getSet().size) * 42;
  game.setScore(newScore);
  document.getElementById('score').innerText = newScore;
};

// Finish the game and show the result
var finish = function finish(game) {
  document.getElementById('result').innerText = '' + game.getScore();
  document.getElementById('end').style.order = '1';
  document.getElementById('play').style.order = '2';
};

// Render the card on the browser page
var render = function render(game) {
  game.getCards().forEach(function (el, ind) {
    var node = document.createElement('div');
    node.setAttribute('data-tid', 'Card');
    node.classList.add('card');

    var face = document.createElement('img');
    face.setAttribute('src', './assets/cards/' + el.getNum() + '.png');

    var back = document.createElement('img');
    back.setAttribute('src', './assets/cards/back.png');
    back.setAttribute('id', '' + ind);
    back.setAttribute('data-tid', 'Card-flipped');
    back.classList.add('back');
    back.classList.add('hide');

    // Add click event listener on a card
    back.addEventListener('click', function (e) {
      blockClicks();

      var index = e.target.getAttribute('id');
      var current = game.getCards()[index];
      var clicked = game.getClicked();

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
        setTimeout(function () {
          blockClicks();
          document.getElementById(index).parentElement.classList.add('hide');
          document.getElementById(clicked.getIndex()).parentElement.classList.add('hide');
          unblockClicks();
        }, 500);
        if (game.getSet().size === 0) {
          finish(game);
        }
        return;
      }

      e.target.classList.add('hide');
      setTimeout(function () {
        game.setClicked(null);
        e.target.classList.remove('hide');
        document.getElementById(clicked.getIndex()).classList.remove('hide');
        downScore(game);
        unblockClicks();
      }, 500);
    });

    node.appendChild(face);
    node.appendChild(back);

    var targetRow = 'row' + (Math.floor(ind / 6) + 1);
    document.getElementsByClassName(targetRow)[0].appendChild(node);
  });
};

// Deal cards, shuffle the chosen ones and start a game
var start = function start(game) {
  game.setScore(0);
  game.deal(function () {
    return Math.floor(52 * Math.random()) + 1;
  });
  game.shuffle(function () {
    return 2 * Math.random() - 1;
  });
  game.putOnTable();

  setTimeout(function () {
    render(game);
  }, 500);

  setTimeout(function () {
    hideCards();
    unblockClicks();
  }, 5000);
};

// Clear the playground
var kill = function kill() {
  document.getElementsByClassName('row1')[0].innerHTML = '';
  document.getElementsByClassName('row2')[0].innerHTML = '';
  document.getElementsByClassName('row3')[0].innerHTML = '';
  document.getElementById('score').innerText = '0';
};

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default([], 9);

  // Start the game when "Start game" button is clicked
  document.getElementById('new-game').addEventListener('click', function () {
    start(game);
    document.getElementById('play').style.order = '1';
    document.getElementById('main').style.order = '2';
  });

  // Restart the game
  document.getElementById('restart-game').addEventListener('click', function () {
    blockClicks();
    kill();
    start(game);
  });

  // Play one more time after showing results
  document.getElementById('one-more').addEventListener('click', function () {
    blockClicks();
    kill();
    start(game);

    document.getElementById('play').style.order = '1';
    document.getElementById('end').style.order = '2';
  });

  // Temporary button for testing the interface
  // document.getElementById('hack').addEventListener('click', () => {
  //   finish(game);
  // });
}, false);

},{"./Game":2}]},{},[3]);
