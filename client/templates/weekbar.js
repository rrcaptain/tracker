WeekDays = new Mongo.Collection(null); 

Template.weekbar.events({
	'click .week-bar': function(){
		Session.set('isExpanded', !Session.get('isExpanded'));
	}
});

Template.weekbar.helpers({
	'isExpanded': function(){
		return Session.get('isExpanded');
	},

	'weekDays': function(){
		WeekDays.remove({});

		var start = tracker.getWeekStart();

		for(var i = 0; i < weekDays; i++){
			var startTime = tracker.getUnixTime(start.toDate());

			var trackedDay = Days.findOne({
				day: startTime
			});

			var trackTime = 0;
			if(trackedDay){
				trackTime = trackedDay.time;
			}

			var position = false;
			if(i == 0){
				position = 'top';
			} else if(i == weekDays - 1){
				position = 'bottom';
			}

			WeekDays.insert({
				day: startTime,
				time: trackTime,
				position: position
			})
			start.add(1, 'days');
		}

		return WeekDays.find();
	}
});

