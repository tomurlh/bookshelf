import gql from 'graphql-tag'

export const DETAILED_BOOK = gql`
	query {
		data(id: $id)
		@rest(type: "DetailedBook", path: "/books/{args.id}", method: "GET") {
			book @type(name: "Book") {
				id
				shelf
				title
				authors
				imageLinks
				averageRating
				publisher
				publishedDate(formatString: "DD/MM/YYYY")
				description
				language
				previewLink
			}
		}
	}
`

export const GET_ALL = gql`
	query {
		data @rest(type: "Books", path: "/books") {
			books @type(name: "Book") {
				id
				shelf
				title
				authors
				imageLinks
			}
		}
	}
`

export const MOVE_BOOK = gql`
	mutation {
		data(id: $id, input: $input)
		@rest(type: "Update", path: "/books/{args.id}", method: "PUT") {
			books @type(name: "Book") {
				id
				shelf
				title
				authors
				imageLinks
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
				shelf
				title
				authors
				imageLinks
			}
		}
	}
`
