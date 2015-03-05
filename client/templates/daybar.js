Template.daybar.helpers({
	'progress': function(){
		return this.time / (this.maxTime / 100);
	},
	'overTime': function(){
		return this.overTime / (this.maxTime / 100);
	},
	'formatTime': function(seconds){
		return tracker.formatTime(seconds);
	}

});

