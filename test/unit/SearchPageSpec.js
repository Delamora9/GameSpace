import SearchPage from 'components/SearchPage';

describe('Search page', () => {
	beforeEach(function() {
		this.renderedDOM = () => React.findDOMNode(this.component);
	});

	it("renders some JSX", function() {
		expect(this.renderedDOM().children.length).toEqual(1);
	});
});