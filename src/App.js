import React, { Component } from 'react'
import './App.css'
import swal from 'sweetalert2'
import * as BooksAPI from './utils/BooksAPI'
import Search from './components/Search'
import Library from './components/Library'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
	state = {
		wantToRead: [],
		currentlyReading: [],
		read: []
	}

	moveBook = (id, shelf) => {
		BooksAPI.update({id}, shelf).then((response) => {
			BooksAPI.getAll().then((response) => {
				return this.setState({
					wantToRead: response.filter((book) => book.shelf === 'wantToRead'),
					currentlyReading: response.filter((book) => book.shelf === 'currentlyReading'),
					read: response.filter((book) => book.shelf === 'read'),
				})
			})
		})
		.then(() => {
			const toast = swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000
			});

			toast({
				type: 'success',
				title: 'Book updated'
			})
		})
	}

	// Return the name of shelf of the book
	// used to mark as selected the shelf of the book in the book options
	whichShelf = (id) => {
		let state = this.state
		let books = state.wantToRead.concat(state.currentlyReading).concat(state.read)
		let book = books.find(function(b) {
			return b.id === id
		})

		if(book) return book.shelf
		else return 'none'
	}



	getState = () => {
		return this.state
	}



	render() {
		return (
			<Router>
				<div>
					<Route path="/" exact render={() => (
						<Library
							getState={this.getState}
							moveBook={this.moveBook}
							whichShelf={this.whichShelf} />
					)} />

					<Route path="/search" render={() => (
						<Search
							moveBook={this.moveBook}
							whichShelf={this.whichShelf} />
					)} />
				</div>
			</Router>
		)
	}

	componentDidMount() {
		localStorage.setItem('token', 'tomurlh-myreads')
		BooksAPI.getAll().then((response) => {
			this.setState({
				wantToRead: response.filter((book) => book.shelf === 'wantToRead'),
				currentlyReading: response.filter((book) => book.shelf === 'currentlyReading'),
				read: response.filter((book) => book.shelf === 'read'),
			})
		})
	}
}

export default App