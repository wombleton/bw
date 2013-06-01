Meteor.users.allow({
    update: function(userId, user, fields, modifier) {
        var allowed = ['game'];

        if (userId !== user._id) {
            return false;
        }

        return _.difference(fields, allowed).length === 0;
    }
});

function displayName(user) {
    if (user.services.twitter && user.services.twitter.screenName) {
        return user.services.twitter.screenName;
    } else if (user.username) {
        return user.username;
    } else if (user.emails) {
        return user.emails && user.emails[0] && user.emails[0].address;
    } else {
        return 'unknown';
    }
};

Meteor.users.displayName = displayName;
