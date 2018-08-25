import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import ScheduleIcon from '@material-ui/icons/Schedule'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import ClearIcon from '@material-ui/icons/Clear'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import BookDetails from './BookDetails'
import '../book.css'

class Book extends React.Component {
	state = {
		open: false,
		bookClass: 'book fadeIn'
	}

	handleClickOpen = () => {
		this.setState({ open: true })
	}

	handleClose = value => {
		this.setState({ open: false })
	}



	// using the whichShelf method passed originaly from parent component App,
	// it identifies the shelf of the book then returns the style of this shelf button
	selected = (shelf) => {
		// console.log(shelf, props.shelf);
		if(shelf === this.props.whichShelf(this.props.id)) {
			return {backgroundColor: 'rgba(0,0,0,0.19)'}
		}
		else return {}
	}

	makeRemoveAnimation() {
		if(!this.props.inSearch)
			this.setState({ bookClass: 'book fadeOut' })
	}




	render() {
		let iconStyle = { fontSize: 15, verticalAlign: 'middle', zIndex: '-5' }
	    return (
			<figure className={this.state.bookClass}>
				<ul className='hardcover_front'>
					<li>
						{ this.props.cover
							? <img src={this.props.cover.smallThumbnail} alt="not available" width="100%" height="100%"/>
							: <img src="#" alt="not available" width="100%" height="100%"/>
						}
					</li>
					<li></li>
				</ul>

				<ul className='page'>
					<li></li>
					<li>
						<div>
							<center>
								<p>
									<Button
										className="btn small-font" style={this.selected('wantToRead')}
										onClick={() => {this.props.moveBook(this.props.id, 'wantToRead')
										}}>
										Want to Read <ScheduleIcon style={iconStyle} />
									</Button>
								</p>
								<p>
									<Button
										className="btn small-font" style={this.selected('currentlyReading')}
										onClick={() => {this.props.moveBook(this.props.id, 'currentlyReading')}}>
										Reading <DoneIcon style={iconStyle} />
									</Button>
								</p>
								<p>
									<Button
										className="btn small-font" style={this.selected('read')}
										onClick={() => {this.props.moveBook(this.props.id, 'read')}}>
										Read <DoneAllIcon style={iconStyle} />
									</Button>
								</p>
								<p>
									<Button
										className="btn small-font" style={this.selected('none')}
										onClick={() => {
											this.makeRemoveAnimation()
											this.props.moveBook(this.props.id, 'none')
										}}>
										None <ClearIcon style={iconStyle} />
									</Button>
								</p>
							</center>
						</div>
					</li>
					<li>
						<center>
							<p style={{marginTop: '50px'}}>
								<Button
									className="small-font flip-btn" style={{ backgroundColor: '#0288D1', width: '90%' }}
									onClick={this.handleClickOpen}>
									<p style={{ color: 'white' }}>Details</p>
									<MoreVertIcon style={{ fontSize: 15, verticalAlign: 'middle', zIndex: '-5', color: 'white' }} />
								</Button>

								<BookDetails
									open={this.state.open}
									bookId={this.props.id}
									handleClose={this.handleClose} />
							</p>
						</center>
					</li>
					<li></li>
					<li></li>
				</ul>

				<ul className='hardcover_back'>
					<li></li>
					<li></li>
				</ul>
				<figcaption>
					<h4>{this.props.title}</h4>
					<span>{this.props.authors}</span>
				</figcaption>
			</figure>
		)
	}
}

Book.propTypes = {
	id: PropTypes.string.isRequired,
	cover: PropTypes.object,
	title: PropTypes.string,
	authors: PropTypes.array,
	shelf: PropTypes.string,
	moveBook: PropTypes.func,
	whichShelf: PropTypes.func,
	description: PropTypes.string,
}

Book.defaultProps = {
	id: '',
	cover: {}
}

export default Book