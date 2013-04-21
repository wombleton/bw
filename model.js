// Burning Wheel -- data model
// Loaded on both the client and the server

///////////////////////////////////////////////////////////////////////////////
// Burning Wheel

/*
  Each party is represented by a document in the Parties collection:
    owner: user id
    title, description: String
    public: Boolean
    invited: Array of user id's that are invited (only if !public)
    rsvps: Array of objects like {user: userId, rsvp: "yes"} (or "no"/"maybe")
*/
Games = new Meteor.Collection("games");

Games.allow({
  insert: function (userId, game) {
    return false; // no cowboy inserts -- use createParty method
  },
  update: function (userId, game, fields, modifier) {
    if (userId !== game.owner) {
        return false; // not the owner
    }

    var allowed = ["description"];
    if (_.difference(fields, allowed).length)
      return false; // tried to write to forbidden field

    // A good improvement would be to validate the type of the new
    // value of the field (and if a string, the length.) In the
    // future Meteor will have a schema system to makes that easier.
    return true;
  },
  remove: function (userId, game) {
    // You can only remove parties that you created and nobody is going to.
    return game.owner === userId;
  }
});

//// Characters

Characters = new Meteor.Collection("characters");

Characters.allow({
  insert: function (userId, character) {
    return false; // no cowboy inserts -- use createParty method
  },
  update: function (userId, character, fields, modifier) {
    if (userId !== character.owner) {
        return false; // not the owner
    }

    var allowed = ["name"];
    if (_.difference(fields, allowed).length)
      return false; // tried to write to forbidden field

    // A good improvement would be to validate the type of the new
    // value of the field (and if a string, the length.) In the
    // future Meteor will have a schema system to makes that easier.
    return true;
  },
  remove: function (userId, character) {
    // You can only remove parties that you created and nobody is going to.
    return character.owner === userId;
  }
});

Meteor.methods({
    // options should include: description
    createGame: function (options) {
        var game;

        options = options || {};

        if (! (typeof options.description === "string" && options.description.length )) {
            throw new Meteor.Error(400, "Required parameter missing");
        }
        if (options.description.length > 1000) {
            throw new Meteor.Error(413, "Description too long");
        }
        if (! this.userId) {
            throw new Meteor.Error(403, "You must be logged in");
        }

        game = {
            owner: this.userId,
            description: options.description,
            gm: this.userId,
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
    joinGame: function(code, callback) {
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
            Session.set('gameNotFound', code);
        } else if (game.gm === this.userId) {
            Session.set('game', game._id);
        } else {
            Games.update(game._id, {
                $addToSet: {
                    players: this.userId
                }
            }, function(err) {
                if (!err) {
                    Session.set('game', game._id);
                }
            });
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

///////////////////////////////////////////////////////////////////////////////
// Users

displayName = function (user) {
    if (user.profile && user.profile.name) {
        return user.profile.name;
    } else {
        return user.emails[0].address;
    }
};

var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};

