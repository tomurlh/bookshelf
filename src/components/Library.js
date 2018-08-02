import React from 'react'
import _ from 'lodash'
import '../defaults.css'

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import BookIcon from '@material-ui/icons/Book'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import Shelf from './Shelf'
import * as BooksAPI from '../utils/BooksAPI'

class Library extends React.Component {
	state = {
		wantToRead: [],
		currentlyReading: [],
		read: []
	}



	generateLayout(books) {
		const p = this.props
		return books.map((book, i) => {
			const y = _.result(p, 'y') ||Math.ceil(Math.random() * 4) + 1
			return {
				i: book.id,
				x: (i * 2) % 12,
				y: Math.floor(i / 2) * y,
				w: 2,
				h: 1
			}
		})
	}



	moveBook = (id, shelf) => {
		BooksAPI.update({id}, shelf).then((response) => {
			BooksAPI.getAll().then((response) => {
				this.setState({
					wantToRead: response.filter((book) => book.shelf === 'wantToRead'),
					currentlyReading: response.filter((book) => book.shelf === 'currentlyReading'),
					read: response.filter((book) => book.shelf === 'read'),
				})
			})
		})
	}


	// Return the name of shelf of the book
	whichShelf = (id) => {
		let state = this.state
		let books = state.wantToRead.concat(state.currentlyReading).concat(state.read)
		let book = books.find(function(b) {
			return b.id === id
		})

		if(book) return book.shelf
		else return 'none'
	}



	render() {
		return (
			<div>
				<AppBar position="static" color="primary">
					<Toolbar>
						<Typography variant="title" color="inherit">
						MyReads <BookIcon />
						</Typography>
					</Toolbar>
				</AppBar>
				<br/>

				<Typography variant="title" color="inherit" style={{ marginLeft: '20px', marginRight: '20px' }}>
					My Library <LibraryBooksIcon />
				</Typography>
				<br/>

				<Shelf name="Want To Read" books={this.state.wantToRead} title={'Want To Read'} moveBook={this.moveBook} whichShelf={this.whichShelf} /><br/>
				<Shelf name="Reading" books={this.state.currentlyReading} title={'Currently Reading'} moveBook={this.moveBook} whichShelf={this.whichShelf} /><br/>
				<Shelf name="Read" books={this.state.read} title={'Read'} moveBook={this.moveBook} whichShelf={this.whichShelf} />

				<Link to={{ pathname: '/search', params: {moveBook: this.moveBook, whichShelf: this.whichShelf} }}>
					<Tooltip title="Add new book">
						<Button variant="fab" color="primary" aria-label="Add" className="open-search">
							<AddIcon />
						</Button>
					</Tooltip>
				</Link>
			</div>
		)
	}

	componentDidMount() {
		BooksAPI.getAll().then((response) => {
			this.setState({
				wantToRead: response.filter((book) => book.shelf === 'wantToRead'),
				currentlyReading: response.filter((book) => book.shelf === 'currentlyReading'),
				read: response.filter((book) => book.shelf === 'read'),
			})
		})
	}
}

export default Library