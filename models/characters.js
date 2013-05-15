//// Characters

Characters = new Meteor.Collection("characters");

Characters.allow({
  insert: function (userId, character) {
    return false; // no cowboy inserts -- use createParty method
  },
  update: function (userId, character, fields, modifier) {
    if (userId !== character.owner) {
        return false; // not the owner
    }

    var allowed = ["name"];
    if (_.difference(fields, allowed).length)
      return false; // tried to write to forbidden field

    // A good improvement would be to validate the type of the new
    // value of the field (and if a string, the length.) In the
    // future Meteor will have a schema system to makes that easier.
    return true;
  },
  remove: function (userId, character) {
    // You can only remove parties that you created and nobody is going to.
    return character.owner === userId;
  }
});
