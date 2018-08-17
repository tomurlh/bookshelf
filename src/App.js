import React, { Component } from 'react'
import './App.css'
import swal from 'sweetalert2'
import * as BooksAPI from './utils/BooksAPI'
import Search from './components/Search'
import Library from './components/Library'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
	// the state is shared through the workflow: App -> Library -> Shelf -> Book
	state = {
		wantToRead: [],
		currentlyReading: [],
		read: []
	}



	moveBook = (id, shelf) => {
		BooksAPI.update({id}, shelf).then((response) => {
			BooksAPI.getAll().then((response) => {
				let app = this
				response.forEach(function(book) {
					if(app.state[book.shelf] === undefined) {
						app.setState({
							[book.shelf]: []
						})
					}
					// update the shelf
					let shelf = app.state[book.shelf]
					shelf.push(book)

					app.setState({
						[book.shelf]: book
					})
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



	addShelf = (name) => {
		this.setState({ [name]: [] })
	}


	// Return the name of shelf of the book
	// used to mark as selected the shelf in the book options
	whichShelf = (id) => {
		let state = this.state
		let books = state.wantToRead.concat(state.currentlyReading).concat(state.read)
		let book = books.find(function(b) {
			return b.id === id
		})

		if(book) return book.shelf
		else return 'none'
	}



	// clear shelf by the name from state
	clearShelf = (shelf) => {
		let state = this.state

		if(state[shelf]) {
			let booksToRemove = state[shelf].filter((book) => book.shelf === shelf)

			booksToRemove.forEach((book) => {
				console.log(book)
				BooksAPI.update({id: book.id}, 'none').then((response) => {
					console.log(response)
				})
			})
			BooksAPI.getAll().then((response) => {
				return this.setState({
					wantToRead: response.filter((book) => book.shelf === 'wantToRead'),
					currentlyReading: response.filter((book) => book.shelf === 'currentlyReading'),
					read: response.filter((book) => book.shelf === 'read'),
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
					title: 'Shelf cleared'
				})
			})
		}
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
							whichShelf={this.whichShelf}
							clearShelf={this.clearShelf}
							addShelf={this.addShelf} />
					)} />

					<Route path="/search" render={() => (
						<Search
							getState={this.getState}
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
			let app = this
			response.forEach(function(book) {
				// adds new shelfs if exists
				if(app.state[book.shelf] === undefined) {
					app.setState({
						[book.shelf]: []
					})
				}
				// update the shelf
				let shelf = app.state[book.shelf]
				shelf.push(book)

				app.setState({
					[book.shelf]: shelf
				})
			})
		})
	}
}

export default App