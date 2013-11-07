describe('<%= _.classify(name) %>', function() {

	beforeEach(module('<%= appname %>'));

	it('should ...', inject(function($filter) {

        var filter = $filter('<%= _.classify(name) %>');

		expect(filter('input')).toEqual('filter result');

	}));

});