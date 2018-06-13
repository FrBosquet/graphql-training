import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooksQuery = gql`
	{
		books {
			name
			genre
			id
		}
	}
`

class BookList extends Component {
	render() {
		return (
			<div>
				<ul id="book-list">{this.displayBooks()}</ul>
			</div>
		)
	}

	displayBooks() {
		const data = this.props.data
		if (data.loading) {
			return <div>Loading books...</div>
		} else {
			return data.books.map(book => (
				<li key={book.id}>
					<strong>{book.name}</strong> ({book.genre})
				</li>
			))
		}
	}
}

export default graphql(getBooksQuery)(BookList)
