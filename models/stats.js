Stats = new Meteor.Collection('sheetstats');

Stats.allow({
    insert: function (userId, stat) {
        return false; // no cowboy inserts -- use createGame method
    },
    update: function (userId, stat, fields, modifier) {
        return false;
    },
    remove: function (userId, stat) {
        return false;
    }
});
