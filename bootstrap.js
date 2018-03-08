import * as api from './src/api/'
import logger from './src/logger'



const schema = Object.keys(api).reduce((schema, name) => `
  ${schema}
  ${api[name].typeDefinition()}
`, '')

logger.debug('resolved schema: ', schema)

const bootstrapTypes = Object.keys(api).filter(key => api[key].bootstrap ? api[key].bootstrap() : false)

const rootQuery = bootstrapTypes.reduce((rootQuery, name) => `
  ${rootQuery}
  ${api[name].query()}
`, '')

logger.debug('constructed rootQueries: ', rootQuery)

const resolvers = {}
bootstrapTypes.forEach(name => {
  logger.debug('attaching resolvers for: ', api[name].typeName())
  resolvers[api[name].typeName()] = api[name].resolver()
})

export {
  schema,
  rootQuery,
  resolvers,
}