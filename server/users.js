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
    if (user.twitter && user.twitter.screenName) {
        return user.twitter.screenName;
    } else if (user.username) {
        return user.username;
    } else {
        return user.emails && user.emails[0] && user.emails[0].address;
    }
};

Meteor.users.displayName = displayName;
