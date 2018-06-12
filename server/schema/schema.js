const graphql = require('graphql')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt
} = graphql

var books = [
	{ name: 'Name of the wind', genre: 'Fantasy', id: '1' },
	{ name: 'Final Empire', genre: 'Fantasy', id: '2' },
	{ name: 'The long heart', genre: 'Sci-Fi', id: '3' }
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
		genre: { type: GraphQLString }
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		age: { type: GraphQLInt },
		name: { type: GraphQLString }
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
		}
	}
})

module.exports = new GraphQLSchema({ query: RootQuery })
