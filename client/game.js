Template.game.owner = function() {
    return this.owner === Meteor.userId();
};

Template.game.player = function() {
    var userId = Meteor.userId();

    return _.find(this.players, function(player) {
        return player.id === userId;
    });
};

Template.game.sheets = function() {
    debugger;
    Meteor.subscribe("characters", this._id);
    return Characters.find({
        gameId: this._id
    });
};
