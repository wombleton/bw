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
    },
    '/games/:id/edit': function(id) {
        Session.set('gameId', id);
        return 'editGame';
    },
    '/sheets/:id': function(id) {
        Session.set('sheetId', id);
        return 'editableSheet';
    }
});

Meteor.Router.beforeRouting = function(context) {
    if (window.ga) {
        ga('send', 'pageview', {
            page: context.pathname,
            title: context.title
        });
    }
}
