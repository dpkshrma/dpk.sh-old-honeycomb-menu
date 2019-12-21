import _ from 'lodash'
import defaultConfig from './default'

const env = process.env.NODE_ENV

let envConfig = {}
try {
  envConfig = require(`./${_.toLower(env)}`).default
} catch (err) {
  // ignore
}

export default _.merge({}, defaultConfig, envConfig)
