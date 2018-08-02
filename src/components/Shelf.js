import React from 'react'
import _ from 'lodash'
import '../defaults.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import GridLayout from 'react-grid-layout'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

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
				<Paper style={{ marginLeft: '20px', marginRight: '20px' }}>
					<Grid container spacing={24}>
						<Grid item xs={12} style={{ marginLeft: '10px', marginRight: '10px' }}>
							<Typography variant="title" color="inherit">
							{this.props.title}
							</Typography>
							<Divider />
							<br/>
							<GridLayout
								className="layout"
								cols={12}
								rowHeight={350}
								width={1200}
								layout={this.generateLayout(this.props.books)}
								isResizable={false}>
								{this.props.books.map((book) =>
								 	<div key={book.id}>
										<Book
											cover={book.imageLinks} id={book.id}
											title={book.title} authors={book.authors} shelf={book.shelf}
											moveBook={this.props.moveBook} whichShelf={this.props.whichShelf}
											description={book.description} />
									</div>
								)}
							</GridLayout>
						</Grid>
					</Grid>
				</Paper>
				<br/><br/>
			</div>
		)
	}
}

export default Shelf