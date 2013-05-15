if (Meteor.isClient) {
    Handlebars.registerHelper('game', function() {
        var user = Meteor.user(),
            gameId = user && user.game;

        return gameId ? Games.findOne(gameId) : null;
    });

    Handlebars.registerHelper('pc', function() {
        var user = Meteor.user(),
            gameId = user && user.game;

        if (gameId) {
            var character = Characters.findOne({
                owner: user._id,
                gameId: gameId
            });

            if (!character) {
                character = Meteor.call('createCharacter', {
                    gameId: gameId,
                    stats: [
                        {
                            label: 'Power',
                            shade: 'B',
                            exponent: 3
                        }
                    ]
                });
            }
            return character;
        } else {
            return null;
        }
    });

    Handlebars.registerHelper('selected', function(a, b) {
      return a === b ? ' selected' : '';
    });
}
