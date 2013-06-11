function getStat(character, label) {
    return _.find(character.stats, function(stat) {
        return stat.stat ? stat.label === label.substring(0,2) : stat.label === label;
    });
}

function getUpdate(character, skill) {
    var exponent,
        roots,
        update;

    update = {
        label: skill.name,
        magic: skill.magic,
        training: skill.training,
        stat: skill.stat
    };

    if (skill.stat) {
        update.label = update.label.substring(0, 2);
    }

    if (skill.roots) {
        roots = _.compact(_.map(skill.roots, function(root) {
            return getStat(character, root);
        }));
    }

    if (!skill.roots) {
        update.shade = skill.shade;
        update.exponent = skill.exponent;

    } else if (roots.length < skill.roots.length) {
        update.shade = 'B';
        update.exponent = 1;
    } else {
        update.shade = _.reduce(_.pluck(roots, 'shade'), function(memo, s) { return s < memo ? s : memo }, 'W');
        exponent = _.reduce(roots, function(memo, root) {
            var exponent = Number(root.exponent);

            if (root.shade > update.shade) {
                exponent += 2;
            }
            return memo + exponent;
        }, 0);

        update.exponent = Math.floor(exponent /  (2 * roots.length));
    }
    return update;
}

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
    deleteGame: function(gameId) {
        var game;

        if (!gameId) {
            throw new Meteor.Error(403, "You need to supply a game id");
        }
        if (! this.userId) {
            throw new Meteor.Error(403, "You must be logged in");
        }

        game = Games.findOne(gameId);

        if (game.owner !== this.userId) {
            throw new Meteor.Error(403, "Can only delete games you own.");
        }

        return Games.remove(gameId);
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
            Meteor.call('createCharacter', {
                gameId: game._id,
                stats: [
                    { label: 'Wi', shade: 'B', stat: true, exponent: 3 },
                    { label: 'Pe', shade: 'B', stat: true, exponent: 3 },
                    { label: 'Ag', shade: 'B', stat: true, exponent: 3 },
                    { label: 'Sp', shade: 'B', stat: true, exponent: 3 },
                    { label: 'Po', shade: 'B', stat: true, exponent: 3 },
                    { label: 'Fo', shade: 'B', stat: true, exponent: 3 }
                ]
            });
            return game._id;
        }
    },
    createCharacter: function(options) {
        var char;

        options = options || {};
        if (!options.gameId) {
            throw new Meteor.Error(413, "Must have a gameId");
        }
        if (! this.userId) {
          throw new Meteor.Error(403, "You must be logged in");
        }

        char = {
            owner: this.userId,
            gameId: options.gameId
        };

        _.extend(char, _.pick(options, 'stats'));

        return Characters.insert(char);
    },
    updateSkill: function(options) {
        var character,
            stat,
            statIndex,
            update = {};

        if (!this.userId) {
            throw new Meteor.Error(403, "You must be logged in");
        }
        options = _.pick(options, 'characterId', 'label', 'shade', 'exponent', 'stat');
        if (_.keys(options).length < 5) {
            throw new Meteor.Error(403, "Missing one of characterId, label, shade, exponent, stat");
        }

        character = Characters.findOne(options.characterId);
        stat = getStat(character, options.label)

        statIndex = _.indexOf(character.stats, stat);

        update['stats.' + statIndex + '.shade'] = options.shade;
        update['stats.' + statIndex + '.exponent'] = options.exponent;

        Characters.update(options.characterId, {
            $set: update
        });
    },
    addSkill: function(options) {
        var character,
            skill,
            update;

        if (!this.userId) {
            throw new Meteor.Error(403, "You must be logged in");
        }
        options = _.pick(options, 'characterId', 'label');
        if (_.keys(options).length < 2) {
            throw new Meteor.Error(403, "Missing one of characterId, label");
        }

        character = Characters.findOne(options.characterId);

        if (getStat(character, options.label)) {
            return;
        }

        skill = Skills.findOne({
            name: options.label
        });
        update = getUpdate(character, skill);

        Characters.update(options.characterId, {
            $push: {
                'stats': update
            }
        });
    },
    addTest: function(gameId) {
        if (!this.userId) {
            throw new Meteor.Error(403, "You must be logged in");
        }
        if (!_.isString(gameId)) {
            throw new Meteor.Error(403, "Missing gameId");
        }

        Tests.insert({
            active: true,
            gameId: gameId,
            owner: this.userId
        });
    }
});
