angular.module('<%= appname %>').factory('<%= _.classify(name) %>',function() {

	var <%= _.classify(name) %> = {};

	return <%= _.classify(name) %>;
});