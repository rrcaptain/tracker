Template.button.created = function(){
	this.trackInterval;

	this.startTracking = function(){
		Session.set('startTime', Math.floor(Date.now() / 1000));
		this.trackInterval = window.setInterval(this.updateTime, 100);
	}

	this.stopTracking = function(){
		window.clearInterval(this.trackInterval);
		Session.set('startTime', 0);
		Session.set('trackTime', 0);
	}

	this.updateTime = function(){
		var currTime = Math.floor(Date.now() / 1000);
		Session.set('trackTime', currTime - Session.get('startTime'));
	}
}

Template.button.events({
	'click .button': function(event, template){
		var status = Session.get('isTracking');

		if(status == true){
			template.stopTracking();
		} else {
			template.startTracking();
		}

		Session.set('isTracking', !Session.get('isTracking'));
	}
});

Template.button.helpers({
	'isTracking': function(){
		return Session.get('isTracking');
	},

	'label': function (){
		if (Session.get('isTracking')){
			return "Stop";
		} else {
			return "Start";
		}
	}
});