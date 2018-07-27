import React from 'react';

class App extends React.Component {
	render() {
	    return (
	        <div>
	            <figure className='book'>

	              <ul className='hardcover_front'>
	                <li>
	                  <img src={props.cover} alt="" width="100%" height="100%"/>
	                </li>
	                <li></li>
	              </ul>

	              <ul className='page'>
	                <li></li>
	                <li>
	                    <div style={style}>
	                      <a class="btn" href="#">Want to Read</a>
	                      <br/><br/>
	                      <a class="btn" href="#">Reading</a>
	                      <br/><br/>
	                      <a class="btn" href="#">Read</a>
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
	              <ul className='book_spine'>
	                <li></li>
	                <li></li>
	              </ul>
	              <figcaption>
	                <h1>{props.title}</h1>
	                <span>{props.author}</span>
	                <p>{props.description}</p>
	              </figcaption>
	            </figure>
	        </div>
	    )
	}
}