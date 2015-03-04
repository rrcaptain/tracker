Template.time.helpers({
	'time': function(){
		var trackTime = Session.get('trackTime') | 0;

		return tracker.formatSeconds(trackTime);
	}
});