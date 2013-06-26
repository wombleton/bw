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

Meteor.publish("characters", function(options) {
    var opt = {};

    if (options.gameId) {
        opt.gameId = options.gameId;
    }
    if (options.characterId) {
        opt._id = options.characterId;
    }

    return Characters.find(opt);
});

Meteor.publish("skills", function() {
    return Skills.find();
});

Meteor.publish("tests", function(gameId) {
    return Tests.find({
        active: true,
        gameId: gameId
    });
});

Meteor.publish('sheetstats', function(sheetId) {
    return Stats.find({
        sheetId: sheetId
    });

});
