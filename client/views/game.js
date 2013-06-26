Meteor.autorun(function () {
    Meteor.subscribe("characters", {
        gameId: Session.get("gameId")
    });
    Meteor.subscribe("tests", Session.get("gameId"));
});

Template.game.game = function() {
    return Games.findOne(Session.get('gameId'));
};

Template.game.owner = function() {
    return this.owner === Meteor.userId();
};

Template.game.canJoin = function() {
    return !this.locked && !Characters.findOne({
        owner: Meteor.userId(),
        gameId: this._id
    });
};

Template.game.sheets = function() {
    return sheets = Characters.find({
        owner: this.owner,
        gameId: this._id
    });
};

Template.game.test = function() {
    return Tests.findOne({
        gameId: this._id
    });
}

Template.game.pcs = function() {
    return Characters.find({
        owner: {
            $not: this.owner
        },
        gameId: this._id
    });
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
    'click [data-action=join-game]': function(e, template) {
        if (Meteor.userId() !== this.owner) {
            Meteor.call('joinGame', this._id, function(err, characterId) {
                if (!err) {
                    Meteor.Router.to('/sheets/' + characterId);
                }
            });
        }
    }
};
