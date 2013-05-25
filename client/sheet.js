function setName(model, template) {
    Characters.update(model._id, {
        $set: {
            name: template.find('[type=text]').value
        }
    });
    Session.set('setCharacterName', false);
}

Template.sheet.events({
    'click [data-action=setname]': function(e, template) {
        var show = !Session.get('setCharacterName');

        Session.set('setCharacterName', show);

        if (!show) {
            setName(this, template);
        }
    },
    'click [data-action=setstat]': function(e, template) {
        Meteor.call('updateStat', {
            characterId: template.data._id,
            label: this.label,
            shade: template.find('[name=shade]').value,
            exponent: template.find('[name=exponent]').value
        });
        Session.set('updateStat', undefined);
        return false;
    },
    'click [data-action=done]': function(e, template) {
        Session.set('addStat', false);
        return false
    },
    'click [data-action=add-stat]': function(e, template) {
        if (Session.get('addStat')) {
            Meteor.call('addStat', {
                characterId: template.data._id,
                label: template.find('[name=new-stat]').value
            });
            template.find('[name=new-stat]').value = '';
        } else {
            Session.set('addStat', true);
            return false;
        }
    },
    'blur [name=name]': function(e, template) {
        setName(this, template);
    },
    'keyup [name=name]': function(e, template) {
        if (e.keyCode === 13) {
            setName(this, template);
        }
    }
});

Template.sheet.statList = function() {
    return JSON.stringify(Skills.find({}).map(function (x) { return x.name; })).replace(/"/g, '&quot;');
};

Template.sheet.addStat = function() {
    return Session.get('addStat');
};

Template.sheet.setCharacterName = function() {
    return Session.get('setCharacterName');
};
Template.sheet.owner = function() {
    return this.owner === Meteor.userId();
};

Template.stat.events({
    'click': function() {
        if (this.owner === Meteor.userId()) {
            Session.set('updateStat', this.label);
        }
    }
});
Template.stat.editable = function() {
    return Session.get('updateStat') === this.label;
};
