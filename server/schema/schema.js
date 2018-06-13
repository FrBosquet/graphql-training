const graphql = require('graphql')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql

var books = [
	{ name: 'Name of the wind', genre: 'Fantasy', id: '1', authorId: '1' },
	{ name: 'Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The long heart', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
  { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
]

var authors = [
	{ name: 'Patrick Rothfuss', age: 44, id: '1' },
	{ name: 'Brian Sanderson', age: 42, id: '2' },
	{ name: 'Terry Pratchet', age: 66, id: '3' }
]

const checkId = id => el => el.id === id

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(checkId(parent.authorId))
      }
    }
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		age: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return books.filter(book => book.authorId === parent.id)
      }
    }
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parents, args) {
				return books.find(checkId(args.id))
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parents, args) {
				return authors.find(checkId(args.id))
			}
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors
      }
    }
	}
})

module.exports = new GraphQLSchema({ query: RootQuery })
