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
				input: shelf
			}
		})
		.then((response) => {
			this.props.getAll().then((response) => {
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
				this.props.moveBook({ 
					variables: {
						id: book.id,
						input: 'none'
					}
				}).then((response) => {
					console.log(response)
				})
			})
			this.props.getAll().then((response) => {
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
		console.log(this.props.getAll)
		// this.props.getAll().then((response) => {
		// 	this.setState({
		// 		wantToRead: response.filter((book) => book.shelf === 'wantToRead'),
		// 		currentlyReading: response.filter((book) => book.shelf === 'currentlyReading'),
		// 		read: response.filter((book) => book.shelf === 'read'),
		// 	})
		// })
	}
}

export default compose(
  graphql(GET_ALL, { name: 'getAll' }),
  graphql(MOVE_BOOK, { name: 'moveBook' })
)(App)
