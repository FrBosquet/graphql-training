const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

var books = [
	{ name: 'Name of the wind', genre: 'Fantasy', id: '1' },
	{ name: 'Name of the wend', genre: 'Fantasy', id: '2' },
	{ name: 'Name of the wond', genre: 'Sci-Fi', id: '3' }
]

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLString }
			},
			resolve(parents, args) {
				return books.find(el => el === args.id)
			}
		}
	}
})

module.exports = new GraphQLSchema({ query: RootQuery })
