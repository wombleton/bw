// All Tomorrow's Games -- client

Meteor.subscribe("directory");
Meteor.subscribe("games");

// If no party selected, select one.
Meteor.startup(function () {
  Deps.autorun(function () {
    if (! Session.get("selected")) {
      var game = Games.findOne();
      if (game) {
        Session.set("selected", game._id);
      }
    }
  });
});

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
    var chars = Characters.find({
    }, {
        sort: {
            updated: -1
        }
    });
    return chars;
};

Template.page.games = function() {
    var games = Games.find({}, {
        sort: {
            updated: -1
        }
    });
    return games;
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
    var description = template.find(".description").value;

    if (description.length) {
      Meteor.call('createGame', {
        description: description
      }, function (error, game) {
        if (!error) {
          Session.set("selected", game);
        }
      });
      Session.set("showCreateCharacterDialog", false);
    } else {
      Session.set("createError", "It needs a title and a description, or why bother?");
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
