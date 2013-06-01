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
    Meteor.subscribe("characters", this._id);
    return sheets = Characters.find({
        gameId: this._id
    }).map(function(c) {
        c.stats = _.map(c.stats, function(stat) {
            stat.slug = stat.label + ':' + c._id;

            return stat;
        });

        return c;
    });
};

Template.game.events = {
    'click [data-action=add-sheet]': function(e, template) {
        if (Meteor.userId() === this.owner) {
            Meteor.call('createCharacter', {
                gameId: this._id,
                stats: []
            });
        }
    }
};
