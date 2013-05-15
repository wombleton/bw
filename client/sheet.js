function setName(id, name) {
    Characters.update(id, {
        $set: {
            name: name
        }
    });
}

Template.sheet.events({
    'click button': function(e) {
        var row = $(e.currentTarget).parents('.row-fluid'),
            show = !Session.get('setCharacterName');

        Session.set('setCharacterName', show);
        if (show) {
            setTimeout(function() {
                row.find('input[type=text]').focus();
            }, 0);
        } else {
            setName(this._id, row.find('input[type=text]').val());
        }
    },
    'blur input': function(e) {
        setName(this._id, $(e.currentTarget).parents('.row-fluid').find('input[type=text]').val());
        Session.set('setCharacterName', false);
    },
    'keyup input': function(e) {
        if (e.keyCode === 13) {
            setName(this._id, $(e.currentTarget).parents('.row-fluid').find('input[type=text]').val());
            Session.set('setCharacterName', false);
        }
    }
});

Template.sheet.setCharacterName = function() {
    return Session.get('setCharacterName');
};
