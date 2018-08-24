import React from 'react'
import PropTypes from 'prop-types'
import '../defaults.css'

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import OpenBookIcon from '@material-ui/icons/ImportContacts'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'

// import BookmarksIcon from '@material-ui/icons/Bookmarks'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Shelf from './Shelf'

const Library = (props) => {

	return (
		<div>
			<AppBar position="static" color="primary" className="br">
				<Toolbar>
					<Typography variant="title" color="inherit">
					MyReads <OpenBookIcon />
					</Typography>
				</Toolbar>
			</AppBar>

			<Typography variant="title" color="inherit" style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '20px' }}>
				My Library <LibraryBooksIcon />
			</Typography>

			<Shelf
				name="wantToRead" className="br"
				books={props.state.wantToRead}
				title={'Want To Read'}
				moveBook={props.moveBook}
				whichShelf={props.whichShelf}
				clearShelf={props.clearShelf} />

			<Shelf
				name="currentlyReading" className="br"
				books={props.state.currentlyReading}
				title={'Currently Reading'}
				moveBook={props.moveBook}
				whichShelf={props.whichShelf}
				clearShelf={props.clearShelf} />

			<Shelf
				name="read"
				books={props.state.read}
				title={'Read'}
				moveBook={props.moveBook}
				whichShelf={props.whichShelf}
				clearShelf={props.clearShelf} />

			<Link to={'/search'}>
				<Tooltip title="Add new book">
					<Button variant="fab" color="primary" aria-label="Add" className="open-search">
						<AddIcon />
					</Button>
				</Tooltip>
			</Link>
		</div>
	)
}

Library.propTypes = {
	state: PropTypes.object.isRequired,
	moveBook: PropTypes.func.isRequired,
	clearShelf: PropTypes.func.isRequired,
}

export default Library