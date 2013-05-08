Template.game.owner = function() {
    return this.owner === Meteor.userId();
};

Template.game.player = function() {
    var userId = Meteor.userId();

    return _.find(this.players, function(player) {
        return player.id === userId;
    });
};

Template.game.character = function() {
    var player = Template.game.player();

    return player && player.character;
}

Template.game.events({
    'click button': function() {
        Game.
        Meteor.call('setupCharacter', Meteor.userId());
    }
});
