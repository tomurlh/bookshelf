import React from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import swal from 'sweetalert2'
import { graphql } from 'react-apollo'
import { SEARCH_BOOKS } from '../utils/Requests.graphql'

class Search extends React.Component {
	state = {
		queryText: '',
		books: [],
	}

	render() {
		return (
			<div>
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={e => this.queryBooks(e.target.value)} />
					</div>
				</div>
				<div style={{ position: 'fixed', marginTop: '80px', width: '100%' }}>
					<Shelf
						name="queriedBooks"
						books={this.state.books}
						title={'Queried Books'}
						whichShelf={this.props.whichShelf}
						whenEmpty="Perform a search to fetch books"
						moveBook={this.props.moveBook} />
				</div>
			</div>
		)
	}


	// Query performed with debounce from Lodash
	queryBooks = debounce((query) => {
		if(!query) {
			this.setState({ books: [] })
			return
		}

		this.props.searchBooks({
	        variables: { input: { query } }
	  	}).then((response) => {
			if(response.error) {
				this.setState({ books: [] })
				// Alert message
				const toast = swal.mixin({
					toast: true, position: 'top-end',
					showConfirmButton: false, timer: 3000
				})
				toast({ type: 'error', title: 'the search did not match any books' })

				return
			}
			this.setState({ books: response.data.data.books })
			// Alert message
			const toast = swal.mixin({
				toast: true, position: 'top-end',
				showConfirmButton: false, timer: 3000
			})
			toast({ type: 'success', title: 'Research completed' })
		})}, 500)
}

export default graphql(SEARCH_BOOKS, { name: 'searchBooks' })(Search)