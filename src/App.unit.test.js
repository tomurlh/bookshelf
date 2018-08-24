import React from 'react'
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
				moveBook={() => {}}
				whichShelf={() => {}}
				clearShelf={() => {}}
				addShelf={() => {}} />)
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
				moveBook={() => {}}
				whichShelf={() => { return 0 }}
				description="something" />)
		expect(wrapper.find('.btn')).to.have.length(4)
	})
})