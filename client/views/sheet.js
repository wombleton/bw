Template.sheet.owner = function() {
    return this.owner === Meteor.userId();
};

Template.sheet.stats = function() {
    return _.filter(this.stats, function(stat) {
        return stat.stat;
    });
};

Template.sheet.skills = function() {
    return _.sortBy(_.filter(this.stats, function(stat) {
        return !stat.stat && !stat.beginner;
    }), 'label');
};

Template.sheet.learning = function() {
    return _.filter(this.stats, function(stat) {
        return !stat.stat && stat.beginner;
    });
}
