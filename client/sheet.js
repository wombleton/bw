function setName(model, template) {
    Characters.update(model.id, {
        $set: {
            name: template.find('[type=text]').value
        }
    });
    Session.set('setCharacterName', false);
}

Template.sheet.events({
    'click button': function(e, template) {
        var show = !Session.get('setCharacterName');

        Session.set('setCharacterName', show);

        if (!show) {
            setName(this, template);
        }
    },
    'blur input': function(e, template) {
        setName(this, template);
    },
    'keyup input': function(e, template) {
        if (e.keyCode === 13) {
            setName(this, template);
        }
    }
});

Template.sheet.setCharacterName = function() {
    return Session.get('setCharacterName');
};

Template.stat.events({
    'click tr': function() {
        Session.set('updateStat', this.label);
    },
    'click button': function() {
        Session.set('updateStat', undefined);
        return false;
    }
});
Template.stat.editable = function() {
    return Session.get('updateStat') === this.label;
};
