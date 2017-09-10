/**
 * Based on https://github.com/voorhoede/front-end-tooling-recipes/tree/master/postcss-process-and-watch
 * in config file format: https://github.com/michael-ciniawsky/postcss-load-config#postcssconfigjs-or-postcssrcjs
 * Options reference: http://api.postcss.org/global.html#processOptions
 */
import atImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import customProperties from 'postcss-custom-properties'
import merge from 'lodash.merge'

const isProduction = (process.env.NODE_ENV === 'production')

export default (ctx) => merge({
  from: 'src/index.js',
  to: 'dist/index.css',
  map: {
    annotation: true,
    inline: false,
    prev: {},
  },
  plugins: [
    atImport(),
    customProperties(),
    autoprefixer({ browsers: 'last 2 versions, not ie <= 10, not ie_mob <= 10' }),
    isProduction && cssnano({ discardComments: { removeAll: true } }),
  ]
}, ctx)