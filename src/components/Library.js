import React from 'react'
import '../defaults.css'

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import BookIcon from '@material-ui/icons/Book'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Shelf from './Shelf'

class Library extends React.Component {

	render() {
		return (
			<div>
				<AppBar position="static" color="primary">
					<Toolbar>
						<Typography variant="title" color="inherit">
						MyReads <BookIcon />
						</Typography>
					</Toolbar>
				</AppBar>
				<br/>

				<Typography variant="title" color="inherit" style={{ marginLeft: '20px', marginRight: '20px' }}>
					My Library <LibraryBooksIcon />
				</Typography>
				<br/>

				<Shelf name="Want To Read" books={this.props.getState().wantToRead} title={'Want To Read'} moveBook={this.props.moveBook} whichShelf={this.props.whichShelf} /><br/>
				<Shelf name="Reading" books={this.props.getState().currentlyReading} title={'Currently Reading'} moveBook={this.props.moveBook} whichShelf={this.props.whichShelf} /><br/>
				<Shelf name="Read" books={this.props.getState().read} title={'Read'} moveBook={this.props.moveBook} whichShelf={this.props.whichShelf} />

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