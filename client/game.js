function getGame() {
    return Games.findOne(Session.get('game'));
}
Template.active.game = function() {
    return getGame();
};

Template.active.gm = function() {
    var game = getGame(),
        userId = Meteor.userId();

    return game.users[userId].role === 'gm';
}
