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



	addShelf = (name) => {
		this.setState({ [name]: [] })
	}


	// Return the name of shelf of the book
	// used to mark as selected the shelf in the book options
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



	getState = () => {
		return this.state
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
							clearShelf={this.clearShelf}
							addShelf={this.addShelf} />
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
			this.setState({
				wantToRead: newProps.getAll.data.books.filter((book) => book.shelf === 'wantToRead'),
				currentlyReading: newProps.getAll.data.books.filter((book) => book.shelf === 'currentlyReading'),
				read: newProps.getAll.data.books.filter((book) => book.shelf === 'read'),
			})
		}
	}
}

export default compose(
  graphql(GET_ALL, { name: 'getAll' }),
  graphql(MOVE_BOOK, { name: 'moveBook' })
)(App)
