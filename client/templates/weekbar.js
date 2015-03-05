WeekDays = new Mongo.Collection(null); 

Template.weekbar.created = function(){
	this.isExpanded = new Blaze.ReactiveVar();
	this.isExpanded.set('false');
};

Template.weekbar.events({
	'click .week-bar': function(event, template){
		template.isExpanded.set(!template.isExpanded.get());
	}
});

Template.weekbar.helpers({
	'isExpanded': function(){
		return Template.instance().isExpanded.get('isExpanded');
	},

	'weekTime': function(){
		var weekTime = 0;

		WeekDays.find().fetch().forEach(function(day){
			weekTime += day.time;
		})

		return weekTime;
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

			var maxTime = maxDayTime;
			var overTime = maxOverTime;

			WeekDays.insert({
				day: startTime,
				time: trackTime,
				maxTime: maxTime,
				overTime: overTime,
				position: position
			})
			start.add(1, 'days');
		}

		return WeekDays.find();
	},

	'formatTime': function(seconds){
		return tracker.formatTime(seconds);
	}
});

