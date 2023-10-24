import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'

const data = {
  developers: [
    { id: '01', name: 'Trevor' },
    { id: '02', name: 'Amanda' },
    { id: '03', name: 'Dave' },
    { id: '04', name: 'Scott' },
    { id: '05', name: 'Brent' },
  ],
}

const typeDefs = `
type Developer {
  id: ID!
  name: String!
}

type Query {
  developers: [Developer]
}
`

const resolvers = {
  Query: {
    developers: (obj, args, context, info) => context.developers,
  },
}

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const port = 4000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: executableSchema,
    context: data,
    graphiql: true,
  })
)
