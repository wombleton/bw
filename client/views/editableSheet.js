Meteor.autorun(function() {
  Meteor.subscribe("characters", {
      characterId: Session.get("sheetId")
  });
});

Template.editableSheet.sheet = function() {
    return Characters.findOne(Session.get('sheetId'));
}
