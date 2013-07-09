if (Meteor.isClient) {
    Handlebars.registerHelper('active', function(a, b) {
      return String(a) === String(b) ? ' active' : '';
    });

    Handlebars.registerHelper('selected', function(a, b) {
      return String(a) === String(b) ? ' selected' : '';
    });
}
