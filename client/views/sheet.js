function setName(model, template) {
    Characters.update(model._id, {
        $set: {
            name: template.find('[type=text]').value
        }
    });
    Session.set('setCharacterName', undefined);
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
        if (this._id === Session.get('setCharacterName')) {
            setName(this, template);
        } else {
            Session.set('setCharacterName', this._id);
        }
        return false;
    },
    'click [data-action=setstat]': function(e, template) {
        Meteor.call('updateSkill', {
            characterId: template.data._id,
            label: this.label,
            shade: template.find('[name=shade]').value,
            exponent: template.find('[name=exponent]').value,
            stat: !!this.stat
        });
        Session.set('updateSkill', undefined);
        return false;
    },
    'click [data-action=done]': function(e, template) {
        Session.set('addSkill', undefined);
        return false
    },
    'keyup [name=new-skill]': function(e, template) {
        if (e.keyCode === 13) {
            addSkill(e, template);
            return false;
        }
    },
    'click [data-action=add-skill]': function(e, template) {
        if (Session.get('addSkill') === this._id) {
            addSkill(e, template);
        } else {
            Session.set('addSkill', this._id);
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
    },
    'click .stat': function(e, template) {
        if (template.data.owner === Meteor.userId() && !this.training) {
            Session.set('updateSkill', this.slug);
        }
    }
});

Template.sheet.addSkill = function() {
    return Session.get('addSkill') === this._id;
};

Template.sheet.setCharacterName = function() {
    return Session.get('setCharacterName') === this._id;
};

Template.sheet.owner = function() {
    return this.owner === Meteor.userId();
};

Template.sheet.stats = function() {
    return _.filter(this.stats, function(stat) {
        return stat.stat;
    });
}
Template.sheet.skills = function() {
    return _.sortBy(_.filter(this.stats, function(stat) {
        return !stat.stat && !stat.beginner;
    }), 'label');
}

Template.sheet.learning = function() {
    return _.filter(this.stats, function(stat) {
        return !stat.stat && stat.beginner;
    });
}

Template.stat.editable = function(e, template) {
    return Session.get('updateSkill') === this.slug;
};
