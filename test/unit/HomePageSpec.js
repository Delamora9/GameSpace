import HomePage from '../../src/components/pages/HomePage.js';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


describe('Home page', () => {
	it("renders an h1", () => {
		let component = ReactTestUtils.renderIntoDocument(<HomePage />);
    let h1 = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    	expect(h1.innerHTML).toEqual("Search");
	});
});
