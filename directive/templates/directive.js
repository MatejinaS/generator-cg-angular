angular.module('<%= appname %>').directive('<%= _.classify(name).charAt(0).toLowerCase() + _.classify(name).substr(1) %>', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/<%= name %>/<%= name %>.html',
		link: function(scope, element, attrs, fn) {

		}
	};
});
