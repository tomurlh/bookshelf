import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'

class Book extends React.Component {
	render() {
		let iconStyle = { fontSize: 15, 'vertical-align': 'middle' }
	    return (
	        <div>
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
	                      <a className="btn" href="/">Want to Read <ScheduleIcon style={iconStyle} /></a>
	                      <br/>
	                      <a className="btn" href="/">Reading <DoneIcon style={iconStyle} /></a>
	                      <br/>
	                      <a className="btn" href="/">Read <DoneAllIcon style={iconStyle} /></a>
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
	                <h2>{this.props.title}</h2>
	                <span>{this.props.author}</span>
	                <p>{this.props.description}</p>
	              </figcaption>
	            </figure>
	        </div>
	    )
	}



	componentDidMount() {
	}
}

export default Book