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
    }
};
