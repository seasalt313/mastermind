(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const GameModel = require('./models/game');
const GameView = require('./views/game');

window.addEventListener('load', function(){
  const game = new GameModel();
  const mainView = new GameView({
    el: document.querySelector('body'), //el = element
    model: game,
  });
  mainView.render();
});


/**
 * This is the function that determines how we 'sync' information, which
 * could mean GET'ing or POST'ing.
 *
 * - method will be one of { create, update, read, delete }
 *                           POST    PUT     GET   DELETE
 * - model is the model that's being saved
 */
Backbone.sync = function (method, model) {
    // Somewhere in our code we're trying to save changes to the server.
    if (method === 'create' || method === 'update') {
        const request = new XMLHttpRequest();
        request.open('POST', 'https://mysterious-wave-13048.herokuapp.com/guess');
        request.setRequestHeader('Content-type', 'application/json');
        request.addEventListener('load', function () {
            const response = JSON.parse(request.responseText);
            console.log(response);
        });

        let message = model.get('guesses');

        request.send(JSON.stringify(message));
    }

    // Somewhere in our code we're trying to get info from the server.
    if (method === 'read') {
        const request = new XMLHttpRequest();
        request.open('GET', 'https://mysterious-wave-13048.herokuapp.com/');
        request.addEventListener('load', function () {
            const response = JSON.parse(request.responseText);

            console.log(response);

            // for (let i = 0; i < response.chats.length; i++) {
                // note: i would create an 'id' property in your chatmodel
                // msg = new ChatModel(); <=== make a new ChatModel for each of response.chats
                // msg.set('from', response.chats[i].from);
                // model.add(msg);
            // }
            // lets say response is event info
            // model.set('name', response.name);
            // model.set('attendees', response.attendees);
            // model.set('when', response.when);
            // model.trigger('change');
            model.set('answer', response)
        });
        request.send();
        Answer(response);
    }
};

},{"./models/game":2,"./views/game":3}],2:[function(require,module,exports){
module.exports = Backbone.Model.extend({ //extend has one param which is an object
  //Built in to backbone, these are the starting values for each property.

  defaults: {
    rounds: 11,
    currentRound: 0,
    guesses: null,
    answer: null,
  },

  saveGuess: function (nums) {

    let guesses = this.get('guesses');
    this.set('guesses', nums)
    console.log(guesses);

    let nextRound = this.get('rounds');
    this.set('rounds', nextRound - 1);

    let current = this.get('currentRound');
    this.set('currentRound', current + 1);

    // specifically for arrays in models
    this.trigger('change');
    this.save();  // send update to server

    console.log(nums);
  },

  // Answer: function (startingArray) {
  //   let answer = startingArray;
  //   this.set('answer', answer);
  // }

  Match: function () {
    let answer = this.get('answer');
    let guesses = this.get('guesses');

    for (let i = 0; i < guesses.length; i++) {
      if (guesses[i] === answer) {
        console.log("You Won");
      } else if (guesses.length > 11) {
        console.log("You ran out of turns");
      }
    };
  }

});

},{}],3:[function(require,module,exports){
// require('./spectrum');

module.exports = Backbone.View.extend({
  initialize: function () {
    this.model.on('change', this.render, this);
  },

  showPallette: function() {
    $(".showPaletteOnly").spectrum({
        showPaletteOnly: true,
        palette: [
            ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
        ]
    });
  },

  events: {
    'click #guess-button': 'makeGuess',
  },

  makeGuess: function() {
    let colorsArray = [];
    let numberedColors = [];
    let round = this.model.get('currentRound');

    console.log($('.row-' + round + ' #firstChoice').spectrum('get'));
    let firstGuess = $('.row-' + round + ' #firstChoice').spectrum('get').toHexString();
    let secondGuess = $('.row-' + round +  ' #secondChoice').spectrum('get').toHexString();
    let thirdGuess = $('.row-' + round + ' #thirdChoice').spectrum('get').toHexString();
    let fourthGuess = $('.row-' + round + ' #fourthChoice').spectrum('get').toHexString();

    colorsArray.push(firstGuess, secondGuess, thirdGuess, fourthGuess);
    console.log(colorsArray);

    for (let i = 0; i < colorsArray.length; i++) {
      if (colorsArray[i] === '#e06666') {
        numberedColors.push(1);
      } else if (colorsArray[i] === '#f6b26b') {
        numberedColors.push(2);
      } else if (colorsArray[i] === '#ffd966') {
        numberedColors.push(3);
      } else if (colorsArray[i] === '#93c47d') {
        numberedColors.push(4);
      } else if (colorsArray[i] === '#76a5af') {
        numberedColors.push(5);
      } else if (colorsArray[i] === '#8e7cc3') {
        numberedColors.push(7);
      } else if (colorsArray[i] === '#c27ba0') {
        numberedColors.push(8);
      } else {
        console.log("no colors chosen");
      }
    }
    console.log(numberedColors);
    this.model.saveGuess(numberedColors);
  },

  render() {
    console.log('rendering');
      const parent = this.el.querySelector('#rowList');
      parent.innerHTML = '';
      const template = document.querySelector('#color-template');
      const guesses = this.model.get('guesses');

      for (let i= 0; i < 12; i++) {
          const li = document.createElement('li');
          li.innerHTML = Mustache.render(
              template.innerHTML,
              {
                number: i,
              }
          );
          parent.appendChild(li);
      };

      this.showPallette() //called at end so its in the right order of ops
  },

});

},{}]},{},[1]);
