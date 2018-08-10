import React from 'react'
import _ from 'lodash'
import '../defaults.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import GridLayout from 'react-grid-layout'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline'
import Typography from '@material-ui/core/Typography'

import Book from './Book'

class Shelf extends React.Component {

	// Methods that generate the layout of the Grid, accoding to number of books of the shelf
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
				<Paper className="paper-adjust">
					<Grid container spacing={24}>
						<Grid item xs={12} className="grid-adjust">
							<Typography>
								<span color="inherit" className="shelf-title-adjust">
									{this.props.title}
								</span>
								{this.props.clearShelf !== undefined &&
									<span className="shelf-action">
										<Button
											variant="contained" color="primary" size="small"
											className="small-font clear-shelf-btn"
											onClick={() => {this.props.clearShelf(this.props.name)}}>
											Clear Shelf <RemoveCircleIcon style={{ fontSize: 15, verticalAlign: 'middle' }} />
										</Button>
									</span>
								}
							</Typography>
							<Divider />
							<br/>

							<GridLayout
								className="layout"
								cols={12}
								rowHeight={350}
								width={1385}
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
							{this.props.books.length <= 0 &&
								<Typography variant="caption" gutterBottom align="center">
									{this.props.whenEmpty}
								</Typography>
							}
							{this.props.books.length > 0 &&
								<Typography variant="caption" gutterBottom align="center">
									This shelf has {this.props.books.length} book(s)
								</Typography>
							}
						</Grid>
					</Grid>
				</Paper>
				<br/><br/>
			</div>
		)
	}
}

Shelf.defaultProps = {
	whenEmpty: 'This shelf is empty'
}

export default Shelf