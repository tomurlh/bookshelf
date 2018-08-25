import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from 'react-star-rating-component'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel'
import { withApollo } from 'react-apollo'
import { DETAILED_BOOK } from '../utils/Requests.graphql'

class BookDetails extends React.Component {
	state = {
		open: this.props.open,
		book: { imageLinks: {}}
	}

	getBookDetails(id) {
		return this.props.client.query({
			query: DETAILED_BOOK,
			variables: { id: id }
		})
	}

	componentDidUpdate(prevProps, prevState) {

		if(this.props.open) {
			this.getBookDetails(this.props.bookId)
			.then((response) => {
				if(JSON.stringify(prevState.book) !== JSON.stringify(response.data.data.book))
					this.setState({ book: response.data.data.book })
			})
		}

	}

	render() {
		let book = this.state.book

		return (
			<Dialog
				fullWidth={true}
				maxWidth={'md'}
				scroll={'paper'}
				open={this.props.open}
				onClose={this.props.handleClose}
				aria-labelledby="simple-dialog-title">
				<DialogTitle id="simple-dialog-title" style={{ backgroundColor: '#1565C0' }}>
					<p style={{ color: 'white' }}>Book Details</p>
				</DialogTitle>
				<br/>
				<div>
					{ this.state.book.id ?
						<Grid container spacing={16} style={{height: '700px'}}>
							<Grid item xs={4}>
								<div style={{ marginLeft: '5px' }}>
									<center>
									{ this.state.book.imageLinks
										? <img src={book.imageLinks.smallThumbnail} alt="not available" width="90%" height="90%"/>
										: <img src="#" alt="not available" width="90%" height="90%"/>
									}
									</center>
								</div>
							</Grid>

							<Grid item xs={8}>
								<div>
									<Typography>{book.title}</Typography>
									<br/>
									<div style={{fontSize: 26}}>
										<StarRating
											name={book.id}
											value={book.averageRating}
											starCount={5} starColor="#ffd272"
											editing={false}
										/>
									</div>

									<br/>
									<Grid container spacing={16}>
										<Grid item xs={6}>
											<FormLabel>Authors:</FormLabel> <p>{book.authors}</p>
										</Grid>
										<Grid item xs={6}>
											<FormLabel>Language:</FormLabel> <p>{book.language}</p>
										</Grid>
										<Grid item xs={6}>
											<FormLabel>Publisher:</FormLabel> <p>{book.publisher}</p>
										</Grid>
										<Grid item xs={6}>
											<FormLabel>Published Date:</FormLabel> <p>{book.publishedDate}</p>
										</Grid>
									</Grid>
									<br/>
									{ this.state.book.previewLink ?
										<Button variant="contained" style={{ backgroundColor: '#FFC107' }}>
									    	<a href={book.previewLink} target="_blank">Preview</a>
									    </Button>
										: ''
									}
								</div>
							</Grid>

							<Grid item xs={1} style={{ marginTop: '-20px' }}>
							</Grid>
							<Grid item xs={10}>
								<Paper style={{ padding: '5px' }}>
									<h4>Description</h4>
									<p>{book.description}</p>
								</Paper>
							</Grid>
						</Grid>
						: ''
					}
				</div>
			</Dialog>
		)
	}
}

BookDetails.propTypes = {
  handleClose: PropTypes.func,
  book: PropTypes.object
}

export default withApollo(BookDetails)