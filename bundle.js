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

    this.num = num;
    this.index = index;
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

var _class = function () {
  function _class() {
    var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

    _classCallCheck(this, _class);

    this.cards = cards;
    this.size = size;
    this.set = new Set();
    this.clicked = null;
    this.score = 0;
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
  }, {
    key: 'deal',
    value: function deal(fn) {
      while (this.set.size < this.size) {
        var num = fn();
        this.set.add(num);
      }
      this.cards = Array.from(this.set).concat(Array.from(this.set));
    }
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

// Запретить клики мышью
var blockClicks = function blockClicks() {
  document.getElementById('veil').style.display = 'block';
};

// Разрешить клики мышью
var unblockClicks = function unblockClicks() {
  document.getElementById('veil').style.display = 'none';
};

// Скрыть все карты
var hideCards = function hideCards() {
  [].forEach.call(document.getElementsByClassName('back'), function (item) {
    item.classList.remove('hide');
  });
};

// Увеличить количество очков
var upScore = function upScore(game) {
  var newScore = game.getScore() + game.getSet().size * 42;
  game.setScore(newScore);
  document.getElementById('score').innerText = newScore;
};

// Уменьшить количество очков
var downScore = function downScore(game) {
  var newScore = game.getScore() - (game.getSize() - game.getSet().size) * 42;
  game.setScore(newScore);
  document.getElementById('score').innerText = newScore;
};

// Завершить игру и показать результат
var finish = function finish(game) {
  document.getElementById('result').innerText = '\u0412\u0430\u0448 \u0438\u0442\u043E\u0433\u043E\u0432\u044B\u0439 \u0441\u0447\u0435\u0442: ' + game.getScore();

  document.getElementById('end').style.order = '1';
  document.getElementById('play').style.order = '2';
  document.getElementById('main').style.order = '3';
};

// Расположить карты на странице игры
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
    back.classList.add('back');
    back.classList.add('hide');

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

// Выбрать случайные карты и начать игру
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

// Убрать карты со стола
var kill = function kill() {
  document.getElementsByClassName('row1')[0].innerHTML = '';
  document.getElementsByClassName('row2')[0].innerHTML = '';
  document.getElementsByClassName('row3')[0].innerHTML = '';
  document.getElementById('score').innerText = '0';
};

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default([], 9);

  // Начать игру
  document.getElementById('new-game-button').addEventListener('click', function () {
    start(game);

    document.getElementById('play').style.order = '1';
    document.getElementById('main').style.order = '2';
    document.getElementById('end').style.order = '3';
  });

  // Перезапустить игру
  document.getElementById('restart-game').addEventListener('click', function () {
    blockClicks();
    kill();
    start(game);
  });

  // Играть еще раз
  document.getElementById('one-more').addEventListener('click', function () {
    blockClicks();
    kill();
    start(game);

    document.getElementById('play').style.order = '1';
    document.getElementById('main').style.order = '2';
    document.getElementById('end').style.order = '3';
  });

  // Временная кнопка для завершения игры
  document.getElementById('hack').addEventListener('click', function () {
    finish(game);
  });
}, false);

},{"./Game":2}]},{},[3]);
