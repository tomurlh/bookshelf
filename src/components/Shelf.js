import React from 'react'
import _ from 'lodash'
import '../defaults.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { Link } from 'react-router-dom'

import GridLayout from 'react-grid-layout'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import Book from '../components/Book'

class Shelf extends React.Component {

	generateLayout() {
		const p = this.props
		return this.props.books.map((book, i) => {
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



	addBook(book, shelf) {
		this.setState((state) => {
			books: state.shelf.map((b) => {
				if(book.id == b.id) {
					// operaões
				}
				else return b
			})
		})
	}



  render() {
	return (
		<div>
			<Grid container spacing={24}>
				<Grid item xs={12}>
					<h1>Want To Read</h1>
					<GridLayout 
						className="layout" 
						cols={12} 
						rowHeight={220} 
						width={1200} 
						layout={this.generateLayout()}
						isResizable={true}>
						{this.props.books.map((book) =>
							<div key={book.id}>
								<Book cover={book.imageLinks.smallThumbnail} />
							</div>
						)}
					</GridLayout>
					<Link to="/search">
						<Button variant="fab" color="primary" aria-label="Add" className="open-search">
							<AddIcon />
						</Button>
					</Link>
				</Grid>
			</Grid>
		</div>
	)
  }
}

export default Shelf