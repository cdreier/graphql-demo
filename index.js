import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import * as config from './bootstrap'

const schema = buildSchema(`
  type Query {
    ${config.rootQuery}
  }

  ${config.schema}
`)

var app = express()
app.use('/graphql', graphqlHTTP({
  rootValue: config.resolvers,
  schema,
  graphiql: true,
}))

app.get('/health', (req, res) => {
  res.sendStatus(200)
})

app.listen(3000, () => console.log('Now browse to localhost:3000/graphql')) // eslint-disable-line
