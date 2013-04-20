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
            users: {},
            updated: Date.now()
        };

        game.users[this.userId] = {};

        return Games.insert(game);
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
    },
    setRole: function(gameId, role) {
        var key = ['users']
            set = {};

        if (!_.isString(gameId)) {
            throw new Meteor.Error(400, "Required parameter missing.");
        }
        if (!_.isString(role)) {
            throw new Meteor.Error(400, "Required parameter missing.");
        }
        if (!this.userId) {
            throw new Meteor.Error(403, "You must be logged in.");
        }
        key.push(this.userId);
        key.push('role');

        set[key.join('.')] = role;

        Games.update(gameId, {
            $set: set
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

