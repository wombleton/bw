Template.test.events = {
    'click [data-action=cancel]': function() {
        Tests.update(this._id, {
            $set: {
                active: false
            }
        });
        return false;
    }
};

Template.test.test = function() {
    return Tests.findOne({
        gameId: Session.get('gameId')
    });
}

Template.test.pcs = function() {
    var c = Characters.find({
        owner: {
            $not: this.owner
        },
        gameId: this.gameId
    }, {
        fields: {
            name: true
        }
    });
    return c;
}
