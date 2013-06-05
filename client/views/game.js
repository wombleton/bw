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

Template.game.game = function() {
    return Games.findOne(Session.get('gameId'));
};

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

Template.controls.test = Template.game.test = function() {
    return _.find(this.tests, function(test) {
        return test.active;
    });
};

Template.test.statList = function() {
    return JSON.stringify(Skills.find({}).map(function (x) { return x.name; })).replace(/"/g, '&quot;');
};

Template.game.events = {
    'click [data-action=add-sheet]': function(e, template) {
        if (Meteor.userId() === this.owner) {
            Meteor.call('createCharacter', {
                gameId: this._id,
                stats: []
            }, function(err, characterId) {
                if (!err) {
                    Session.set('setCharacterName', characterId);
                }
            });
        }
    },
    'click [data-action=set-obstacle]': function(e, template) {
        if (Meteor.userId() === this.owner) {
            Games.update(this._id, {
                $push: {
                    tests: {
                        active: true,
                        createdAt: Date.now()
                    }
                }
            });
        }
    }
};
