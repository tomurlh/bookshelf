import React from 'react'
import App, { moveBook, addShelf, whichShelf, clearShelf } from './App'
import Library from './components/Library'
import Shelf from './components/Shelf'
import Book from './components/Book'

describe('Components Rendering', () => {
	it('renders the Library', () => {
		const wrapper = shallow(
			<Library
				state={{
					wantToRead: [],
					currentlyReading: [],
					read: []
				}}
				moveBook={moveBook}
				whichShelf={whichShelf}
				clearShelf={clearShelf}
				addShelf={addShelf} />)
		expect(wrapper.find(Shelf)).to.have.length(3)
	})



	it('renders the Book', () => {
		const wrapper = shallow(
			<Book
				cover={{imageLinks: ""}}
				id={'1'}
				title="something"
				authors={[]}
				shelf="none"
				moveBook={moveBook}
				whichShelf={() => { return 0 }}
				description="something" />)
		expect(wrapper.find('.btn')).to.have.length(4)
	})



	it('update Book shelf from currentlyReading to wantToRead', () => {
		const wrapper = shallow(<App />);

		wrapper.setState({
			wantToRead: [],
			currentlyReading: [{
	            "title": "The Linux Command Line",
	            "authors": [
	                "William E. Shotts, Jr."
	            ],
	            "imageLinks": {
	                "smallThumbnail": "",
	                "thumbnail": ""
	            },
	            "id": "1",
	            "shelf": "currentlyReading"
        	}],
			read: []
		});
		wrapper.find('btn').at(0).simulate('click');

		expect(wrapper.state().wantToRead).to.have.length(1);
	});
})