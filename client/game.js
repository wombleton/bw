function getGame() {
    var user = Meteor.user(),
        id = user && user.game;

    return id ? Games.findOne(id) : false;
}

Template.game.gm = function() {
    var game = getGame(),
        userId = Meteor.userId();

    return game.gm === userId;
};
