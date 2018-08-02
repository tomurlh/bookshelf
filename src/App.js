import React, { Component } from 'react'
import './App.css'

import Search from './components/Search'
import Library from './components/Library'

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact render={() => <Library />} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    )
  }
}

export default App