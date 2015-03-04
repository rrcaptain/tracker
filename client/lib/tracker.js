tracker = {};

tracker.formatSeconds = function(seconds){
    var date = new Date(1970,0,1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

tracker.getCurrentDay = function(){
	var now = new Date();
	var today = new Date('');
	today.setFullYear(now.getFullYear());
	today.setMonth(now.getMonth());
	today.setDate(now.getDate()); 
	return today;
};

tracker.getUnixTime = function(date) { 
	return date.getTime()/1000|0 
};

tracker.getWeekStart = function(){
	var start = moment().startOf('week').add(1, 'day'); 
	return start;
}

tracker.getWeekEnd = function(){
	var end = moment().endOf('week').subtract(1, 'day'); 
	return end;
}