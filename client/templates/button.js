Template.button.created = function(){
	this.trackInterval;

	this.startTracking = function(){
		Session.set('startTime', Math.floor(Date.now() / 1000));
		this.trackInterval = window.setInterval(this.updateTime, 100);
	}

	this.stopTracking = function(){
		window.clearInterval(this.trackInterval);

		var trackTime = Session.get('trackTime');
		var today = tracker.getUnixTime(tracker.getCurrentDay());

		var existingDay = Days.findOne({day: today});

		if(existingDay){
			Days.update({
				_id: existingDay._id
			},{
				$set: { time: trackTime + existingDay.time }
			});
		} else {
			Days.insert({
				day: today,
				time: trackTime
			});
		}

		Session.set('startTime', 0);
		Session.set('trackTime', 0);
	};

	this.updateTime = function(){
		var currTime = Math.floor(Date.now() / 1000);
		Session.set('trackTime', currTime - Session.get('startTime'));
	};
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