import SearchPage from '../../src/components/pages/SearchPage.js';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


describe('Search page', () => {
	it("renders an h1", () => {
		let component = ReactTestUtils.renderIntoDocument(<SearchPage />);

    	let h1 = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h1');

    	expect(h1.innerHTML).toEqual("Search");
	});
});
