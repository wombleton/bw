Meteor.users.allow({
    update: function(userId, user, fields, modifier) {
        var allowed = ['game'];

        if (userId !== user._id) {
            return false;
        }

        return _.difference(fields, allowed).length === 0;
    }
});
