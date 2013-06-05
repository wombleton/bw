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
    '/': 'index',
    '/games': 'games',
    '/games/:id': function(id) {
        Session.set('gameId', id);
        return 'game';
    }
});

Meteor.Router.beforeRouting = function() {
    if (window.ga) {
        ga('send', 'pageview');
    }
}
