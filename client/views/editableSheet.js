Meteor.autorun(function() {
    Meteor.subscribe('sheetstats', Session.get('sheetId'));
});

Template.editableSheet.sheet = function() {
    return Characters.findOne(Session.get('sheetId'));
};

Template.editableSheet.stats = function() {
    return Stats.find({
        sheetId: Session.get('sheetId')
    });
};

Template.editableSheet.game = function() {
    return Games.findOne(Template.editableSheet.sheet().gameId);
};

function addSkill(e, template) {
    Meteor.call('addStat', {
        sheetId: this._id,
        label: template.find('[name=skill]').value
    }, function(err, result) {
        debugger;
    });
    template.find('[name=skill]').value = '';
}

Template.editableSheet.events({
    'input [name=name]': function(e, template) {
        Characters.update(this._id, {
            $set: {
                name: template.find('[name=name]').value
            }
        });
    },
    'keyup [name=skill]': function(e, template) {
        if (e.keyCode === 13) {
            addSkill(e, template);
            return false;
        }
    }
});
