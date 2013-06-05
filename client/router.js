Meteor.Router.filters({
  'checkLoggedIn': function(page) {
    if (Meteor.user()) {
      return page;
    } else {
      return 'index';
    }
  }
});

Meteor.Router.filter('checkLoggedIn', {
    except: 'index'
});

Meteor.Router.add({
    '/': function() {
        Session.set('gameId');
        return 'index';
    },
    '/games': function() {
        Session.set('gameId');
        return 'games';
    },
    '/games/:id': function(id) {
        Session.set('gameId', id);
        return 'game';
    }
});
