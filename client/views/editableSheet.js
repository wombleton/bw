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
