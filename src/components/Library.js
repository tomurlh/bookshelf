import React from 'react'
import '../defaults.css'

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import BookIcon from '@material-ui/icons/Book'
import OpenBookIcon from '@material-ui/icons/ImportContacts'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'

// import BookmarksIcon from '@material-ui/icons/Bookmarks'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Shelf from './Shelf'
import AddShelfForm from './AddShelfForm'

class Library extends React.Component {
	state = {
		open: false,
		newShelf: ''
	}



	handleClickOpen = () => {
		this.setState({ open: true });
	}

	handleClose = () => {
		this.setState({ open: false });
	}



	render() {
		return (
			<div>
				<AppBar position="static" color="primary">
					<Toolbar>
						<Typography variant="title" color="inherit">
						MyReads <OpenBookIcon />
						</Typography>
						<Button color="inherit" className="to-right" onClick={this.handleClickOpen}>Add Shelf <BookIcon /></Button>
					</Toolbar>
				</AppBar>
				<br/>

				<AddShelfForm
					open={this.state.open}
					handleClose={this.handleClose}
					addShelf={this.props.addShelf}
				/>

				<Typography variant="title" color="inherit" style={{ marginLeft: '20px', marginRight: '20px' }}>
					My Library <LibraryBooksIcon />
				</Typography>
				<br/>

				{Object.getOwnPropertyNames(this.props.getState()).map((shelf) => {
					let books = this.props.getState()[shelf];
					let shelfNames = Object.getOwnPropertyNames(this.props.getState())

					return <Shelf
							key={shelf}
							name={shelf}
							books={books}
							title={shelf}
							actionNames={shelfNames}
							moveBook={this.props.moveBook}
							whichShelf={this.props.whichShelf}
							clearShelf={this.props.clearShelf} />
				})}

				<Link to={{
					pathname: '/search',
					state: {
						state: this.something
					}
				}}>
					<Tooltip title="Add new book">
						<Button variant="fab" color="primary" aria-label="Add" className="open-search">
							<AddIcon />
						</Button>
					</Tooltip>
				</Link>
			</div>
		)
	}
}

export default Library