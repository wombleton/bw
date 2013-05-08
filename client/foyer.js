// All Tomorrow's Games -- client

Meteor.subscribe("directory");
Meteor.subscribe("games");
Meteor.subscribe("characters");

///////////////////////////////////////////////////////////////////////////////

// PAGE
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

    e.preventDefault();

    if (name.length) {
        Meteor.call('createGame', {
            name: name
        });
    } else {
        Session.set("createError", "Games have to have descriptions.");
    }
};

Template.gameList.events({
    'click [type=submit]': Template.gameList.createGame,
    'submit form': Template.gameList.createGame
});

Template.gameItem.events({
    'click': function(event, template) {
        var game = template.data;
        Meteor.users.update(Meteor.userId(), {
            $set: {
                game: game._id
            }
        });
    }
});
