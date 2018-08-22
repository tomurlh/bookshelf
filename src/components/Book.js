import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import ScheduleIcon from '@material-ui/icons/Schedule'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import ClearIcon from '@material-ui/icons/Clear'
import '../book.css'

class Book extends React.Component {

	// using the whichShelf method passed originaly from parent component App,
	// it identifies the shelf of the book then returns the style of this shelf button
	selected = (shelf) => {
		if(shelf === this.props.whichShelf(this.props.id)) {
			return {backgroundColor: 'rgba(0,0,0,0.19)'}
		}
		else return {}
	}

	render() {
		let iconStyle = { fontSize: 15, verticalAlign: 'middle' }
		let image = this.props.cover.smallThumbnail
	    return (
			<figure className='book'>
				<ul className='hardcover_front'>
					<li>
						<img src={image} alt="not available" width="100%" height="100%"/>
					</li>
					<li></li>
				</ul>

				<ul className='page'>
					<li></li>
					<li>
						<div>
							<center>
								<Button
									className="btn small-font" style={this.selected('wantToRead')}
									onClick={() => {this.props.moveBook(this.props.id, 'wantToRead')}}>
									Want to Read <ScheduleIcon style={iconStyle} />
								</Button>

								<br/>

								<Button
									className="btn small-font" style={this.selected('currentlyReading')}
									onClick={() => {this.props.moveBook(this.props.id, 'currentlyReading')}}>
									Reading <DoneIcon style={iconStyle} />
								</Button>

								<br/>

								<Button
									className="btn small-font" style={this.selected('read')}
									onClick={() => {this.props.moveBook(this.props.id, 'read')}}>
									Read <DoneAllIcon style={iconStyle} />
								</Button>

								<br/>

								<Button
									className="btn small-font"
									onClick={() => {this.props.moveBook(this.props.id, 'none')}}>
									None <ClearIcon style={iconStyle} />
								</Button>
							</center>
						</div>
					</li>
					<li></li>
					<li></li>
					<li></li>
				</ul>

				<ul className='hardcover_back'>
					<li></li>
					<li></li>
				</ul>
				<br/><br/><br/><br/>
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
	cover: PropTypes.object.isRequired,
	title: PropTypes.string,
	authors: PropTypes.array,
	shelf: PropTypes.string,
	moveBook: PropTypes.func,
	whichShelf: PropTypes.func,
	description: PropTypes.string,
}

Book.defaultProps = {
	id: '',
	shelf: '',
	cover: {}
}

export default Book