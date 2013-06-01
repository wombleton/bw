Meteor.autorun(function () {
  Meteor.subscribe("characters", Session.get("gameId"));
});

function mapSheet(sheet) {
    sheet.stats = _.map(sheet.stats, function(stat) {
        stat.slug = stat.label + ':' + sheet._id;

        return stat;
    });

    return sheet;
}

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
    return sheets = Characters.find({
        owner: this.owner,
        gameId: this._id
    }).map(mapSheet);
};

Template.game.pcs = function() {
    return sheets = Characters.find({
        owner: {
            $not: this.owner
        },
        gameId: this._id
    }).map(mapSheet);
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
