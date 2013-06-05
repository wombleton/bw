Template.controls.test = function() {
    return Tests.findOne({
        gameId: this._id
    });
};

Template.controls.events = {
    'click [data-action=set-obstacle]': function(e, template) {
        if (Meteor.userId() === this.owner) {
            Meteor.call('addTest', this._id);
        }
    }
}
