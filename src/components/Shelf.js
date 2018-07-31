import React from 'react'
import _ from 'lodash'
import '../defaults.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import GridLayout from 'react-grid-layout'
import Grid from '@material-ui/core/Grid'

import Book from './Book'

class Shelf extends React.Component {

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


	render() {
		return (
			<div>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<h3>{this.props.title}</h3>
						<hr/><br/>
						<GridLayout 
							className="layout" 
							cols={12} 
							rowHeight={275} 
							width={1200} 
							layout={this.generateLayout(this.props.books)}
							isResizable={true}>
							{this.props.books.map((book) => 
							 	<div key={book.id}>
									<Book
										cover={book.imageLinks.smallThumbnail} id={book.id}
										title={book.title} authors={book.authors} shelf={book.shelf}
										moveBook={this.props.moveBook} description={book.description} />
								</div>
							)}
						</GridLayout>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default Shelf