import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import ScheduleIcon from '@material-ui/icons/Schedule'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import ClearIcon from '@material-ui/icons/Clear'
import '../book.css'

const Book = (props) => {
	let iconStyle = { fontSize: 15, verticalAlign: 'middle', zIndex: '-5' }

	// using the whichShelf method passed originaly from parent component App,
	// it identifies the shelf of the book then returns the style of this shelf button
	const selected = (shelf) => {
		// console.log(shelf, props.shelf);
		if(shelf === props.whichShelf(props.id)) {
			return {backgroundColor: 'rgba(0,0,0,0.19)'}
		}
		else return {}
	}

    return (
		<figure className='book'>
			<ul className='hardcover_front'>
				<li>
					{ props.cover
						? <img src={props.cover.smallThumbnail} alt="not available" width="100%" height="100%"/>
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
									className="btn small-font" style={selected('wantToRead')}
									onClick={() => {props.moveBook(props.id, 'wantToRead')}}>
									Want to Read <ScheduleIcon style={iconStyle} />
								</Button>
							</p>
							<p>
								<Button
									className="btn small-font" style={selected('currentlyReading')}
									onClick={() => {props.moveBook(props.id, 'currentlyReading')}}>
									Reading <DoneIcon style={iconStyle} />
								</Button>
							</p>
							<p>
								<Button
									className="btn small-font" style={selected('read')}
									onClick={() => {props.moveBook(props.id, 'read')}}>
									Read <DoneAllIcon style={iconStyle} />
								</Button>
							</p>
							<p>
								<Button
									className="btn small-font" style={selected('none')}
									onClick={() => {props.moveBook(props.id, 'none')}}>
									None <ClearIcon style={iconStyle} />
								</Button>
							</p>
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
			<figcaption>
				<h4>{props.title}</h4>
				<span>{props.authors}</span>
			</figcaption>
		</figure>
	)
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