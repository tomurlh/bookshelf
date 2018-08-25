## MyReads

This is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.

Application from the Nanodegree program of React from Udacity.


## External Libraries

- material-ui
- lodash
- Apollo + GraphQL
- Mocha + Enzyme
- react-router
- react-grid-layout
- sweetalert2


## Installing

- Install all project dependencies with `npm install`;
- Start the development server with npm `start`;


## Shelfs

The app comes with 3 shelfs:

- Want To Read;
- Currently Reading;
- Read;

<!-- In the app you can add more shelves as you wish (e.g.: a new shelf with books of sports).
You can clear the shelf too with a button in the top right corner.
 -->

## Books

by hovering the mouse over the book you can see the actions that can move it between your shelves, or remove it from your library.


## Workflow

This app is pretty simple and have just 5 components besides de App:

- Library => container that keeps all your shelves;
- Shelf => component that group your books by some criteria (Want To Read, Currently Reading or Reading is the default options);
- Book => the book itself;
- BookDetails => modal with book details;
- Search => component that search for new books to add to your library;


## State

The state of this app is shared through the components that needs to add books (Search) or change the shelf of some book (Shelf), so the workflow of the state is:

App contains the state

`App -> Library -> Shelf -> Book`

and:

`App -> Search`