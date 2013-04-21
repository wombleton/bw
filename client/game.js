function getGame() {
    return Games.findOne(Session.get('game'));
}

Template.game.game = function() {
    return getGame();
};

Template.lock.game = function() {
    return getGame();
};

Template.game.gm = function() {
    var game = getGame(),
        userId = Meteor.userId();

    return game.gm === userId;
};
