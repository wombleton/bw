// All Tomorrow's Games -- client

Meteor.subscribe("directory");
Meteor.subscribe("games");
Meteor.subscribe("characters");

///////////////////////////////////////////////////////////////////////////////

// PAGE
Template.page.game = function() {
    return Games.findOne(Session.get('game'));
};

// FOYER
Template.foyer.events({
    'click [data-action=new-game]': function() {
        Session.set("createError", null);
        Session.set("showCreateGameDialog", true);
    },
    'click .game': function() {
        Session.set('game', this._id);
    }
});

Template.foyer.games = function() {
    return Games.find({}, {
        sort: {
            updated: -1
        }
    });
};

Template.foyer.showCreateCharacterDialog = function() {
    return Session.get('showCreateCharacterDialog');
};

Template.foyer.showCreateGameDialog = function() {
    return Session.get('showCreateGameDialog');
};

Template.createGameDialog.events({
  'click .save': function(event, template) {
    var description = template.find(".description").value;

    if (description.length) {
      Meteor.call('createGame', {
        description: description
      }, function (error, game) {
        if (!error) {
          Session.set('game', game);
        }
      });
      Session.set("showCreateGameDialog", false);
    } else {
      Session.set("createError", "Games have to have descriptions.");
    }
  },

  'click .cancel': function () {
    Session.set("showCreateGameDialog", false);
  }
});

Template.createGameDialog.error = function () {
  return Session.get("createError");
};
