import React, { Component } from 'react'
import './App.css'
import swal from 'sweetalert2'
import { graphql, compose } from 'react-apollo'
import { GET_ALL, MOVE_BOOK } from './utils/Requests.graphql'
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
		this.props.moveBook({
			variables: {
				id: id,
				input: { shelf }
			}
		})
		.then((response) => {
			this.props.getAll.refetch()
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



	// Return the name of shelf of the book.
	// Used to mark as selected the shelf in the book options.
	// This method is necessary because in the search page,
	// all the books comes with the shelf null
	whichShelf = (id) => {
		let state = this.state
		let books = state.wantToRead.concat(state.currentlyReading).concat(state.read)
		var book = books.find((b) => b.id === id)
		if(book !== undefined) return book.shelf
		else return 'none'
	}



	// clear shelf by the name from state
	clearShelf = (shelf) => {
		let state = this.state

		if(state[shelf]) {
			let booksToRemove = state[shelf].filter((book) => book.shelf === shelf)

			booksToRemove.forEach((book) => {
				this.props.moveBook({
					variables: {
						id: book.id,
						input: {shelf: 'none'}
					}
				})
				.then(() => { this.props.getAll.refetch() })
			})
			this.props.getAll.refetch()
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



	render() {
		return (
			<Router>
				<div>
					<Route path="/" exact render={() => (
						<Library
							state={this.state}
							moveBook={this.moveBook}
							whichShelf={this.whichShelf}
							bookDetails={this.handleClickOpen}
							clearShelf={this.clearShelf} />
					)} />

					<Route path="/search" render={() => (
						<Search
							state={this.state}
							moveBook={this.moveBook}
							whichShelf={this.whichShelf} />
					)} />
				</div>
			</Router>
		)
	}

	componentWillReceiveProps(newProps) {
		if(!newProps.getAll.loading) {
			this.props.getAll.refetch()
			.then((response) => {
				let books = newProps.getAll.data.books
				let filterByShelf = (books, shelf) => books.filter((b) => b.shelf === shelf)
				this.setState({
					wantToRead: filterByShelf(books, 'wantToRead'),
					currentlyReading: filterByShelf(books, 'currentlyReading'),
					read: filterByShelf(books, 'read'),
				})
			})
		}
	}
}

export default compose(
  graphql(GET_ALL, { name: 'getAll' }),
  graphql(MOVE_BOOK, { name: 'moveBook' })
)(App)
