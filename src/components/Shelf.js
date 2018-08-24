import React from 'react'
import PropTypes from 'prop-types'
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

const Shelf = (props) => {

	// Methods that generate the layout of the Grid, accoding to number of books of the shelf
	const generateLayout = (books) => {
		const p = props
		if(books.length > 0) {
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
		else {
			return [
				{i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
				{i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
				{i: 'c', x: 4, y: 0, w: 1, h: 2}
			]
		}
	}



	const renderContent = () => {
		if(props.books.length > 0) {
			return props.books.map((book) =>
			 	<div key={book.id}>
					<Book
						cover={book.imageLinks} id={book.id} title={book.title}
						authors={book.authors} whichShelf={props.whichShelf}
						shelf={book.shelf}
						moveBook={props.moveBook} description={book.description} />
				</div>
			)
		}
	}



	return (
		<div>
			<Paper className="paper-adjust" style={{ marginBottom: '20px' }}>
				<Grid container spacing={24}>
					<Grid item xs={12} className="grid-adjust">
						<Typography>
							<span color="inherit" className="shelf-title-adjust">
								{props.title}
							</span>
							{props.clearShelf !== undefined &&
								<span className="shelf-action">
									<Button
										variant="contained" color="primary" size="small"
										className="small-font clear-shelf-btn"
										onClick={() => {props.clearShelf(props.name)}}>
										Clear Shelf <RemoveCircleIcon style={{ fontSize: 15, verticalAlign: 'middle' }} />
									</Button>
								</span>
							}
						</Typography>
						<Divider style={{ marginBottom: '10px' }} />

						<GridLayout
							className="layout"
							cols={12}
							rowHeight={350}
							width={1385}
							layout={generateLayout(props.books)}
							isResizable={false}>
							{renderContent()}
						</GridLayout>
						{props.books.length <= 0 &&
							<Typography variant="caption" gutterBottom align="center">
								{props.whenEmpty}
							</Typography>
						}
						{props.books.length > 0 &&
							<Typography variant="caption" gutterBottom align="center">
								This shelf has {props.books.length} book(s)
							</Typography>
						}
					</Grid>
				</Grid>
			</Paper>
		</div>
	)
}

Shelf.defaultProps = {
	whenEmpty: 'This shelf is empty'
}

Shelf.propTypes = {
	name: PropTypes.string,
	books: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	moveBook: PropTypes.func.isRequired,
	clearShelf: PropTypes.func,
}

export default Shelf