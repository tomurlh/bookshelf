import React, { Component } from 'react'
import './App.css'

import Search from './components/Search'
import Home from './components/Home'

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    )
  }
}

export default App