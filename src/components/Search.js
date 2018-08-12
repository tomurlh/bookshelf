import React from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import swal from 'sweetalert2'
import * as BooksAPI from '../utils/BooksAPI'

class Search extends React.Component {
	state = {
		queryText: '',
		books: [],
	}

	render() {
		let shelfNames = Object.getOwnPropertyNames(this.props.getState())

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
				<br/><br/><br/><br/>
				<div>
					<Shelf
						name="queriedBooks"
						books={this.state.books}
						title={'Queried Books'}
						whenEmpty="Perform a search to fetch books"
						actionNames={shelfNames}
						moveBook={this.props.moveBook}
						whichShelf={this.props.whichShelf} />
				</div>
			</div>
		)
	}


	// Query performed with debounce from Lodash
	queryBooks = debounce((queryText) => {
		if(!queryText) {
			this.setState({ books: [] })
			return
		}

		BooksAPI.search(queryText).then((response) => {
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
			this.setState({ books: response })
			// Alert message
			const toast = swal.mixin({
				toast: true, position: 'top-end',
				showConfirmButton: false, timer: 3000
			})
			toast({ type: 'success', title: 'Research completed' })
		})
	}, 1500)
}

export default Search