Template.editGame.game = function() {
    return Games.findOne(Session.get('gameId'));
};

Template.editGame.events = {
    'click button': function(e, template) {
        Meteor.call('deleteGame', this._id, function() {
            Meteor.Router.to('/games');
        });
    }
}
