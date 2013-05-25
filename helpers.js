if (Meteor.isClient) {
    Handlebars.registerHelper('game', function() {
        var user = Meteor.user(),
            gameId = user && user.game;

        return gameId ? Games.findOne(gameId) : null;
    });

    Handlebars.registerHelper('selected', function(a, b) {
      return String(a) === String(b) ? ' selected' : '';
    });
}
