import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import ScheduleIcon from '@material-ui/icons/Schedule'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import ClearIcon from '@material-ui/icons/Clear'
import '../book.css'

class Book extends React.Component {

	selectedStyle = (shelf) => {
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
									className="btn small-font" style={this.selectedStyle('wantToRead')}
									onClick={() => {this.props.moveBook(this.props.id, 'wantToRead')}}>
									Want to Read <ScheduleIcon style={iconStyle} />
								</Button>

								<br/>

								<Button
									className="btn small-font" style={this.selectedStyle('currentlyReading')}
									onClick={() => {this.props.moveBook(this.props.id, 'currentlyReading')}}>
									Reading <DoneIcon style={iconStyle} />
								</Button>

								<br/>

								<Button
									className="btn small-font" style={this.selectedStyle('read')}
									onClick={() => {this.props.moveBook(this.props.id, 'read')}}>
									Read <DoneAllIcon style={iconStyle} />
								</Button>

								<br/>

								<Button
									className="btn small-font" style={this.selectedStyle('none')}
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
	shelf: PropTypes.string.isRequired,
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