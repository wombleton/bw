Meteor.subscribe("games");

Template.gameList.games = function() {
    return Games.find({}, {
        sort: {
            updated: -1
        }
    });
};

Template.gameList.createGame = function(e, template) {
    var name = template.find('[name=create]').value;

    e.preventDefault();

    if (name.length) {
        Meteor.call('createGame', {
            name: name
        });
    } else {
        Session.set("createError", "Games have to have descriptions.");
    }
};

Template.gameList.joinGame = function(e, template) {
    var code = template.find('[name=join]').value;

    e.preventDefault();

    if (code.length) {
        Meteor.call('joinGame', code);
        template.find('[name=join]').value = '';
    } else {
        Session.set("createError", "Games have to have descriptions.");
    }
};

Template.gameList.events({
    'click .create [type=submit]': Template.gameList.createGame,
    'click .join [type=submit]': Template.gameList.joinGame,
    'submit .create form': Template.gameList.createGame,
    'submit .join form': Template.gameList.joinGame
});
