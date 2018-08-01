import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

class Search extends React.Component {

	render() {
		return (
			<div>
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
					<input
						type="text" 
						placeholder="Search by title or author" 
						onChange={_.debounce(this.queryBooks, 5000)} />
				</div>
			</div>
				<p>Search view</p>
			</div>
		)
	}



	queryBooks() {
		console.log('test')
	}


}

export default Search