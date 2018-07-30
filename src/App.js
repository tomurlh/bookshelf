import React, { Component } from 'react'
import './App.css'

import Search from './components/Search'
import Shelf from './components/Shelf'

import * as BooksAPI from './utils/BooksAPI'

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  state = {
    books: []
  }




  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact render={() => <Shelf books={this.state.books} />} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    )
  }



  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })

    // BooksAPI.update({}, 'read').then((response) => {
    //   console.log(response)
    // })
  }
}

export default App