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
    return Games.find({
        $or: [
            {
                players: this.userId
            },
            {
                owner: this.userId
            }
        ]
    });
});

Meteor.publish("characters", function() {
    return Characters.find({
        owner: this.userId
    });
});
