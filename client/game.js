function getGame() {
    return Games.findOne(Session.get('game'));
}
Template.game.game = function() {
    return getGame();
};

Template.invites.locked = function() {
    return getGame().locked;
};

Template.game.gm = function() {
    var game = getGame(),
        userId = Meteor.userId();

    return game.users[userId].role === 'gm';
};
