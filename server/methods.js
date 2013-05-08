Meteor.methods({
    // options should include: name
    createGame: function (options) {
        var game;

        options = options || {};

        if (! (typeof options.name === "string" && options.name.length )) {
            throw new Meteor.Error(400, "Required parameter missing");
        }
        if (options.name.length > 1000) {
            throw new Meteor.Error(413, "Description too long");
        }
        if (! this.userId) {
            throw new Meteor.Error(403, "You must be logged in");
        }

        game = {
            owner: this.userId,
            name: options.name,
            gm: {
                id: this.userId,
                name: Meteor.users.displayName(Meteor.user())
            },
            players: [],
            updated: Date.now()
        };

        return Games.insert(game, function(err, id) {
            var code;

            if (!err) {
                code = id.toUpperCase().replace(/[0OI1]/g, '');
                code = code.substring(0, 3) + '-' + code.substring(3, 6);
                Games.update(id, {
                    $set: {
                        code: code
                    }
                });
            }
        });
    },
    joinGame: function(code) {
        var game,
            key = ['users'];

        if (! this.userId) {
            throw new Meteor.Error(403, "You must be logged in");
        }
        if (!_.isString(code)) {
            throw new Meteor.Error(400, "Required code missing.");
        }

        game = Games.findOne({
            code: code
        });

        if (!game) {
            return 'gameNotFound';
        } else if (game.gm === this.userId) {
            return game._id;
        } else {
            Games.update(game._id, {
                $addToSet: {
                    players: {
                        id: this.userId,
                        name: Meteor.users.displayName(Meteor.user())
                    }
                }
            });
            return game._id;
        }
    },
    createCharacter: function(options) {
        options = options || {};
        if (! (typeof options.name === "string" && options.name.length )) {
            throw new Meteor.Error(400, "Required parameter missing");
        }
        if (options.name.length > 100) {
            throw new Meteor.Error(413, "Description too long");
        }
        if (! this.userId) {
          throw new Meteor.Error(403, "You must be logged in");
        }

        return Characters.insert({
            owner: this.userId,
            name: options.name,
            stats: [],
            updated: Date.now()
        });
    }
});


