// All Tomorrow's Games -- client

Meteor.subscribe("directory");
Meteor.subscribe("games");
Meteor.subscribe("characters");

///////////////////////////////////////////////////////////////////////////////
// Create Party dialog

function openCreateGameDialog() {
  Session.set("createError", null);
  Session.set("showCreateGameDialog", true);
}

function openCreateCharacterDialog() {
  Session.set("createError", null);
  Session.set("showCreateCharacterDialog", true);
};

Template.page.events({
    'click [data-action=new-game]': function() {
        openCreateGameDialog();
    },
    'click [data-action=new-character]': function() {
        openCreateCharacterDialog();
    }
});

Template.page.characters = function() {
    return Characters.find({}, {
        sort: {
            updated: -1
        }
    });
};

Template.page.games = function() {
    return Games.find({}, {
        sort: {
            updated: -1
        }
    });
};

Template.page.showCreateCharacterDialog = function() {
    return Session.get('showCreateCharacterDialog');
};

Template.page.showCreateGameDialog = function() {
    return Session.get('showCreateGameDialog');
};

Template.createGameDialog.events({
  'click .save': function(event, template) {
    var description = template.find(".description").value;

    if (description.length) {
      Meteor.call('createGame', {
        description: description
      }, function (error, game) {
        if (!error) {
          Session.set("selected", game);
        }
      });
      Session.set("showCreateGameDialog", false);
    } else {
      Session.set("createError", "It needs a title and a description, or why bother?");
    }
  },

  'click .cancel': function () {
    Session.set("showCreateGameDialog", false);
  }
});
Template.createCharacterDialog.events({
  'click .save': function(event, template) {
    var name = template.find(".name").value;

    if (name.length) {
      Meteor.call('createCharacter', {
        name: name
      }, function (error, character) {
      });
      Session.set("showCreateCharacterDialog", false);
    } else {
      Session.set("createError", "Characters needs names.");
    }
  },

  'click .cancel': function () {
    Session.set("showCreateCharacterDialog", false);
  }
});

Template.createGameDialog.error = function () {
  return Session.get("createError");
};
Template.createCharacterDialog.error = function () {
  return Session.get("createError");
};
