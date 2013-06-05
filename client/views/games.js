Meteor.subscribe("games");

Template.games.games = function() {
    return Games.find({}, {
        sort: {
            updated: -1
        }
    });
};

Template.games.createGame = function(e, template) {
    var name = template.find('[name=create]').value;

    e.preventDefault();

    if (name.length) {
        Meteor.call('createGame', {
            name: name
        }, function(err, gameId) {
            if (!err) {
                Meteor.Router.to('/games/' + gameId);
            }
        });
    } else {
        Session.set("createError", "Games have to have descriptions.");
    }
};

Template.games.joinGame = function(e, template) {
    var code = template.find('[name=join]').value;

    e.preventDefault();

    if (code.length) {
        Meteor.call('joinGame', code);
        template.find('[name=join]').value = '';
    } else {
        Session.set("createError", "Games have to have descriptions.");
    }
};

Template.games.events({
    'click .create [type=submit]': Template.games.createGame,
    'submit .create form': Template.games.createGame
});
