import SearchPage from '../../src/components/pages/SearchPage.js';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


describe('Search page', () => {
	beforeEach(function() {
		this.renderedDOM = () => React.findDOMNode(this.component);
	});

	it("renders some JSX", function() {
		expect(this.renderedDOM().children.length).toEqual(1);
	});
});
