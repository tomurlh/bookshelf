import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

class AddShelfForm extends React.Component {
	state = {
		shelfName: ''
	}

	addShelf = (shelfName) => {
		this.props.addShelf(this.state.shelfName)
		// this.props.handleClose
	}


	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};


	render() {
		return (
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.props.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					>
					<DialogTitle id="alert-dialog-title">{"Add the name of the shelf"}</DialogTitle>

					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<form>
								<TextField
									id="shelfName"
									label="Shelf mame"
									value={this.state.shelfName}
									onChange={this.handleChange('shelfName')}
									// onClisk={}
									margin="normal"
								/>
							</form>
						</DialogContentText>
					</DialogContent>

					<DialogActions>
						<Button onClick={this.addShelf.bind(this.state.shelfName)} color="primary" autoFocus>
							Add
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default AddShelfForm