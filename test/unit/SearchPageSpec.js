import SearchPage from '../../src/components/pages/SearchPage.js';
import React from 'react';

describe('Search page', () => {
	beforeEach(function() {
		this.renderedDOM = () => React.findDOMNode(this.component);
	});

	it("renders some JSX", function() {
		expect(this.renderedDOM().children.length).toEqual(1);
	});
});
