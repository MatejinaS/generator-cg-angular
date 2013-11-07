angular.module('<%= appname %>').filter('<%= _.classify(name) %>', function() {
	return function(input,arg) {
		return '';
	};
});