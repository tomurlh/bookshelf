import gql from 'graphql-tag'

export const GET_ALL = gql`
	query {
		data @rest(type: "Books", path: "/books") {
			books @type(name: "Book") {
				id
				title
				shelf
				imageLinks
				authors
			}
		}
	}
`

export const MOVE_BOOK = gql`
	mutation {
		data(id: $id, input: $input)
		@rest(type: "Update", path: "/books/:id", method: "PUT") {
			books @type(name: "Book") {
				id
				title
				shelf
				imageLinks
				authors
			}
		}
	}
`

export const SEARCH_BOOKS = gql`
	mutation {
		data(input: $input)
		@rest(type: "Search", path: "/search", method: "POST") {
			books @type(name: "Book") {
				id
				title
				shelf
				imageLinks
				authors
			}
		}
	}
`
