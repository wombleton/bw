function setName(model, template) {
    Characters.update(model._id, {
        $set: {
            name: template.find('[type=text]').value
        }
    });
    Session.set('setCharacterName', false);
}

function addSkill(e, template) {
    Meteor.call('addSkill', {
        characterId: template.data._id,
        label: template.find('[name=new-skill]').value
    });
    template.find('[name=new-skill]').value = '';
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
        Session.set('addSkill', false);
        return false
    },
    'keyup [name=new-skill]': function(e, template) {
        if (e.keyCode === 13) {
            addSkill(e, template);
            return false;
        }
    },
    'click [data-action=add-skill]': function(e, template) {
        if (Session.get('addSkill')) {
            addSkill(e, template);
        } else {
            Session.set('addSkill', true);
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

Template.sheet.addSkill = function() {
    return Session.get('addSkill');
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
