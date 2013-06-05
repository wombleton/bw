Tests = new Meteor.Collection("tests");

Tests.allow({
  insert: function (userId, test) {
    return false; // no cowboy inserts -- use createParty method
  },
  update: function (userId, test, fields, modifier) {
    if (userId !== test.owner) {
        return false; // not the owner
    }

    var allowed = ["active", "name"];

    if (_.difference(fields, allowed).length) {
      return false; // tried to write to forbidden field
    }

    // A good improvement would be to validate the type of the new
    // value of the field (and if a string, the length.) In the
    // future Meteor will have a schema system to makes that easier.
    return true;
  },
  remove: function (userId, test) {
    // You can only remove parties that you created and nobody is going to.
    return test.owner === userId;
  }
});
