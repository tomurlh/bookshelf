import React from 'react'
import PropTypes from 'prop-types'
import '../defaults.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline'
import Typography from '@material-ui/core/Typography'
import Book from './Book'
import { WidthProvider, Responsive } from "react-grid-layout"

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Shelf extends React.Component {
	state = {
		layouts: JSON.parse(global.localStorage.getItem(this.props.name)) || {}
	};

	onLayoutChange = (shelf, layouts) => {
		this.saveToLS(shelf, layouts);
		this.setState({ layouts });
	}

	getFromLS = (layoutName) => {
		let ls = {}
		ls = JSON.parse(global.localStorage.getItem(layoutName)) || {}
		return ls[layoutName];
	}

	saveToLS = (shelfName, value) => {
		let lsLayout = JSON.parse(global.localStorage.getItem(shelfName)) || {}
		if(JSON.stringify(lsLayout[shelfName]) !== JSON.stringify(value)) {
			global.localStorage.setItem(shelfName, JSON.stringify({ [shelfName]: value }))
		}
	}

	resetLayout = (shelfName) => {
		global.localStorage.removeItem(shelfName)
		this.setState({ layouts: {} })
	}



	renderContent = () => {
		if(this.props.books.length > 0) {
			return this.props.books.map((book, i) => {
				// The next two lines are responsible to generate the default layout
				let layout = {x: (i * 2) % 12, y: Math.floor(i / 2), w: 2, h: 1}
			 	return <div key={book.id} data-grid={layout}>
					<Book
						cover={book.imageLinks} id={book.id} title={book.title}
						authors={book.authors} whichShelf={this.props.whichShelf}
						shelf={book.shelf}
						moveBook={this.props.moveBook} description={book.description} />
				</div>
			}
			)
		}
	}


	render() {
		let shelfActionStyle = { color: 'white', backgroundColor: '#F57C00' }
		let shelfLastActionStyle = { color: 'white', backgroundColor: '#D32F2F' }
		let shelfActionIconStyle = { fontSize: 15, verticalAlign: 'middle' }
		return (
			<div>
				<Paper className="paper-adjust" style={{ marginBottom: '20px' }}>
					<Grid container spacing={24}>
						<Grid item xs={12} className="grid-adjust">
							<Grid container spacing={8}>
								<Grid item xs={3}>
									<Typography>
										<span color="inherit" className="shelf-title-adjust">
											{this.props.title}
										</span>
									</Typography>
								</Grid>

								<Grid item xs={7}></Grid>

								<Grid item xs={2}>
									<span className="shelf-actions">
										<Button
											variant="contained" style={shelfActionStyle} size="small"
											className="small-font shelf-btn"
											onClick={() => {this.resetLayout(this.props.name)}}>
											Reorganize <ClearAllIcon style={shelfActionIconStyle} />
										</Button>
									{this.props.clearShelf !== undefined &&
										<Button
											variant="contained" style={shelfLastActionStyle} size="small"
											className="small-font last-shelf-btn"
											onClick={() => {this.props.clearShelf(this.props.name)}}>
											Clear Shelf <RemoveCircleIcon style={shelfActionIconStyle} />
										</Button>
									}
									</span>
								</Grid>
							</Grid>
							<Divider style={{ marginBottom: '10px' }} />

							<ResponsiveReactGridLayout
								className="layout"
								rowHeight={350}
								width={1385}
								layouts={this.getFromLS(this.props.name)}
								onLayoutChange={(layout, layouts) =>
									this.onLayoutChange(this.props.name, layouts)
								}
								breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
								cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
								isResizable={false}>
								{this.renderContent()}
							</ResponsiveReactGridLayout>
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
			</div>
		)
	}
}

Shelf.defaultProps = {
	whenEmpty: 'This shelf is empty'
}

Shelf.propTypes = {
	name: PropTypes.string,
	title: PropTypes.string.isRequired,
	moveBook: PropTypes.func.isRequired,
	clearShelf: PropTypes.func,
}

export default Shelf