// All Tomorrow's Games -- client

Meteor.subscribe("directory");
Meteor.subscribe("skills");

///////////////////////////////////////////////////////////////////////////////

Template.gameItem.events({
    'click': function(event, template) {
        var game = template.data;
        Meteor.users.update(Meteor.userId(), {
            $set: {
                game: game._id
            }
        });
    }
});

Template.gameItem.owner = function(e, template) {
    return this.owner === Meteor.userId();
};
