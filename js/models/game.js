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
