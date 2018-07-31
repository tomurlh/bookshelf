import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import '../book.css'

class Book extends React.Component {

	render() {
		let iconStyle = { fontSize: 15, verticalAlign: 'middle' }
	    return (
			<figure className='book'>
				<ul className='hardcover_front'>
					<li>
						<img src={this.props.cover} alt="" width="100%" height="100%"/>
					</li>
					<li></li>
				</ul>

				<ul className='page'>
					<li></li>
					<li>
						<br/><br/>
						<div>
							<button 
								className="btn" type="button"
								onClick={() => {this.props.moveBook(this.props.id, 'wantToRead')}}>
								Want to Read <ScheduleIcon style={iconStyle} />
							</button>
							
							<br/>
							
							<button 
								className="btn" type="button"
								onClick={() => {this.props.moveBook(this.props.id, 'currentlyReading')}}>
								Reading <DoneIcon style={iconStyle} />
							</button>

							<br/>

							<button 
								className="btn" type="button"
								onClick={() => {this.props.moveBook(this.props.id, 'read')}}>
								Read <DoneAllIcon style={iconStyle} />
							</button>
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



	componentDidMount() {
	}
}

export default Book