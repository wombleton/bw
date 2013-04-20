function getGame() {
    return Games.findOne(Session.get('active'));
}
Template.active.game = function() {
    return getGame();
};

Template.active.role = function() {
    var game = getGame(),
        userId = Meteor.userId();

    return game.users[userId].role;
}

Template.active.events({
    'click [data-role]': function(e) {
        var role = $(e.currentTarget).attr('data-role');

        Meteor.call('setRole', Session.get('active'), role);
    }
});
