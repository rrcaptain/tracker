Template.weekbar.events({
	'click .week-bar': function(){
		console.log('click weekbar');
		Session.set('isExpanded', !Session.get('isExpanded'));
	}
});

Template.weekbar.helpers({
	'isExpanded': function(){
		return Session.get('isExpanded');
	}
});

