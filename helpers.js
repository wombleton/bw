if (Meteor.isClient) {
    Handlebars.registerHelper('game', function() {
        var user = Meteor.user(),
            id = user && user.game;

        return id ? Games.findOne(id) : null;
    });
}
