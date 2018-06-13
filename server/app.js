const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const schema = require('./schema/schema')
const mongoose = require('mongoose')

mongoose.connect(
	'mongodb://fran:fran1234@ds159020.mlab.com:59020/gql-ninja'
)
mongoose.connection.once('open', () => console.log('connected to db'))

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
)

app.listen(
	4000,
	() => console.log('Listening in port 4000') //eslint-disable-line
)
