Template.button.created = function(){
	this.trackInterval;

	this.startTracking = function(){
		Session.set('startTime', Math.floor(Date.now() / 1000));
		this.trackInterval = window.setInterval(this.updateTime, 100);
	}

	this.stopTracking = function(){
		window.clearInterval(this.trackInterval);

		var trackTime = Session.get('trackTime');
		var today = this.getUnixTime(this.getCurrentDay());

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

	this.getCurrentDay = function(){
		var now = new Date();
		var today = new Date('');
		today.setFullYear(now.getFullYear());
		today.setMonth(now.getMonth());
		today.setDate(now.getDate()); 
		return today;
	};

	this.getUnixTime = function(date) { 
		return date.getTime()/1000|0 
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