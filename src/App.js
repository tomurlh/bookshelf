import React, { Component } from 'react'
import _ from 'lodash'

import logo from './logo.svg'

import './App.css'
import './defaults.css'
import './book.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import Book from './components/Book'

import GridLayout from 'react-grid-layout'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import * as BooksAPI from './utils/BooksAPI'

class App extends Component {
  state = {
    books: []
  }

  generateLayout() {
    const p = this.props
    return this.state.books.map((book, i) => {
      const y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1
      console.log((i * 5) % 12)
      console.log(Math.floor(i / 5) * y);
      return {
        i: book.title,
        x: (i * 5) % 12,
        y: Math.floor(i / 5) * y,
        w: 4,
        h: 1
      }
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <GridLayout 
          className="layout" 
          cols={12} 
          rowHeight={220} 
          width={1200} 
          layout={this.generateLayout()}
          autoSize={true}
          compactType={'horizontal'}
          isResizable={false}>
          {this.state.books.map((book) =>
            <div key={book.title}>
              <Book
                title={book.title} 
                cover={book.imageLinks.smallThumbnail} 
                author={book.authors} />
            </div>
          )}
        </GridLayout>


        <footer className="footer">
          <BottomNavigation>
            <BottomNavigationAction
              label="Recents"
              icon={<AddCircleOutlineIcon />}
            />
          </BottomNavigation>
        </footer>
      </div>
    )
  }



  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
}

export default App