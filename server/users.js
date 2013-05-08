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
    if (user.profile && user.profile.name) {
        return user.profile.name;
    } else {
        return user.emails[0].address;
    }
};

Meteor.users.displayName = displayName;

function contactEmail(user) {
    if (user.emails && user.emails.length) {
        return user.emails[0].address;
    } else if (user.services && user.services.facebook && user.services.facebook.email) {
        return user.services.facebook.email;
    } else {
        return null;
    }
};

