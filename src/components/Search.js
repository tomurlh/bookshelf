import React from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import * as BooksAPI from '../utils/BooksAPI'

class Search extends React.Component {
	state = {
		text: '',
		books: [],
		moveBook: null,
		whichShelf: null,
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
				<br/><br/><br/><br/>
				<div>
					<Shelf
						name="Queried Books"
						books={this.state.books}
						title={'Queried Books'}
						moveBook={this.state.moveBook}
						whichShelf={this.state.whichShelf} />
				</div>
			</div>
		)
	}



	queryBooks = debounce((text) => {
		if(!text) {
			this.setState({ books: [] })
			return
		}

		BooksAPI.search(text).then((response) => {
			if(response.error) {
				this.setState({ books: [] })
				return
			}
			this.setState({ books: response })
		})
	}, 1500)

	componentDidMount() {
		console.log(this.props.location.state)
		// this.setState({
		// 	moveBook: this.props.location.params.moveBook,
		// 	whichShelf: this.props.location.params.whichShelf,
		// })
	}

	// componentWillUmount() {
	// 	this.state.moveBook.cancel()
	// 	this.props.whichShelf.cancel()
	// }
}

export default Search