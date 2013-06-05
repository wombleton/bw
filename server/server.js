// Hardholder-- server

Meteor.publish("directory", function() {
    return Meteor.users.find({}, {
        fields: {
            emails: 1,
            game: 1,
            profile: 1
        }
    });
});

Meteor.publish("games", function() {
    return Games.find();
});

Meteor.publish("characters", function(gameId) {
    return Characters.find({
        gameId: gameId
    });
});

Meteor.publish("skills", function() {
    return Skills.find();
});
