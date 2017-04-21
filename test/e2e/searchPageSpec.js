describe('Search Page', function() {
	'use strict';

	browser.ignoreSynchronization = true;
	browser.get('http://localhost:8081');

	it('should have "Game Space" as the <title>', function() {
		expect(browser.getTitle()).toMatch('localhost');
	});
});