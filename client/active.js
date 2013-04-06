Template.active.description = function() {
    return Games.findOne(Session.get('active')).description;
};

