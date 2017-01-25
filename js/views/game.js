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
