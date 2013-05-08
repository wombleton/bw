// Burning Wheel -- data model
// Loaded on both the client and the server

Games = new Meteor.Collection("games");

Games.allow({
    insert: function (userId, game) {
        return false; // no cowboy inserts -- use createGame method
    },
    update: function (userId, game, fields, modifier) {
        var allowed = ['description'];

        if (userId !== game.owner) {
            return false; // not the owner
        }

        return _.difference(fields, allowed).length === 0; // tried to write to forbidden field
    },
    remove: function (userId, game) {
        // You can only remove games that you created
        return game.owner === userId;
    }
});
