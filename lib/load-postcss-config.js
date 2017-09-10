/**
 * Shim behaviour of https://github.com/michael-ciniawsky/postcss-load-config (simplified)
 * as it uses `cosmiconfig` which throws an error on `rollup.config.js`.
 */
import omit from 'lodash.omit'
import postcssConfig from '../postcss.config.js'

export default (ctx) => {
  const config = postcssConfig(ctx)
  const options = omit(config, ['plugins'])
  const plugins = config.plugins.filter(plugin => plugin !== false)
  return Promise.resolve({ options, plugins })
}