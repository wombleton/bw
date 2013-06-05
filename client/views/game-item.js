Template.gameItem.events({
    'click': function(event, template) {
        Meteor.Router.to('/games/' + this._id);
    }
});

Template.gameItem.owner = function(e, template) {
    return this.owner === Meteor.userId();
};

