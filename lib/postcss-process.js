import chalk from 'chalk'
import fs from 'fs'
import loadPostcssConfig from './load-postcss-config'
import postcss from 'postcss'
import { promisify } from 'util'

const writeFileAsync = promisify(fs.writeFile)

export default ({ css, map }) => {
  return loadPostcssConfig({ map: { prev: map } })
    .then(({ options, plugins }) => {
      return postcss(plugins).process(css, options)
        .then(({ css, map }) => Promise.all([
          writeFileAsync(options.to, css),
          writeFileAsync(`${options.to}.map`, map),
        ]))
        .then(() => console.log(chalk.green(`created ${chalk.bold(options.to)}`)))
    })
}