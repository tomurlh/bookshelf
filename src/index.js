import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const authLink = setContext((_, { headers }) => {
	let token = localStorage.token
	if (!token)
		token = localStorage.token = Math.random().toString(36).substr(-8)
	return {
		headers: {
			...headers,
			authorization: localStorage.token
		}
	}
});

const client = new ApolloClient({
	link: authLink.concat(
		new RestLink({
		uri: 'https://reactnd-books-api.udacity.com',
		credentials: 'same-origin'

	})),
	cache: new InMemoryCache()
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
	, document.getElementById('root'))
registerServiceWorker()
