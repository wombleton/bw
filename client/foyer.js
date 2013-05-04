// All Tomorrow's Games -- client

Meteor.subscribe("directory");
Meteor.subscribe("games");
Meteor.subscribe("characters");

///////////////////////////////////////////////////////////////////////////////

// PAGE
Template.page.game = function() {
    var user = Meteor.user();

    return user && Games.findOne(user.game);
};

Template.gameList.games = function() {
    return Games.find({}, {
        sort: {
            updated: -1
        }
    });
};

Template.gameList.canCreate = function() {
    return Template.gameList.games().count() < 3;
}

Template.gameList.createGame = function(e, template) {
    var name = template.find('input').value;

    debugger;
    e.preventDefault();

    if (name.length) {
        Meteor.call('createGame', {
            description: name
        }, function (err, game) {
            if (!err) {
                debugger;
                Session.set('game', game);
            }
        });
    } else {
        Session.set("createError", "Games have to have descriptions.");
    }
};

Template.gameList.events({
    'click [type=submit]': Template.gameList.createGame,
    'submit form': Template.gameList.createGame
});

// FOYER
Template.foyer.events({
    'click [data-action=join]': function(e) {
        var code = $('[name=code]').val();
        return false;
    }
});

Template.createGameDialog.events({
  'click .save': function(event, template) {
  },

  'click .cancel': function () {
    Session.set("showCreateGameDialog", false);
  }
});

Template.createGameDialog.error = function () {
  return Session.get("createError");
};
