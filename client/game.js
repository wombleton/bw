function getGame() {
    return Games.findOne(Session.get('active'));
}
Template.active.game = function() {
    return getGame();
};

Template.active.role = function() {
    var game = getGame(),
        userId = Meteor.userId();

    if (game.gm === userId) {
        return 'gm';
    } else if (_.contains(game.players, userId)) {
        return 'player';
    }
}

Template.active.events({
    'click [data-role]': function(e) {
        var game = getGame(),
            role = $(e.currentTarget).attr('data-role'),
            userId = Meteor.userId();

        if (role === 'gm') {
            Games.update(Session.get('active'), {
                $set: {
                    gm: userId
                }
            });
        } else {
            Games.update(Session.get('active'), {
                $push: {
                    players: userId
                }
            });
        }
    }
});
