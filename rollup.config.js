// based on https://github.com/voorhoede/front-end-tooling-recipes/blob/master/rollup-bundle-and-watch/
import buble from 'rollup-plugin-buble'           // https://buble.surge.sh/guide/
import commonjs from 'rollup-plugin-commonjs'     // https://github.com/rollup/rollup-plugin-commonjs
import resolve from 'rollup-plugin-node-resolve'  // https://github.com/rollup/rollup-plugin-node-resolve
import svelte from 'rollup-plugin-svelte'         // https://github.com/rollup/rollup-plugin-svelte
import uglify from 'rollup-plugin-uglify'         // https://github.com/TrySound/rollup-plugin-uglify

import postcssProcess from './lib/postcss-process'

const isProduction = (process.env.NODE_ENV === 'production')

export default {
	input: 'src/index.js',
	output: {
    file: 'dist/index.js',
    format: 'iife',
  },
  sourcemap: 'dist/index.js.map',
	plugins: [
		svelte({
      cascade: false, // results in smaller CSS file
      css: (css) => postcssProcess({ 
        css: css.code, 
        map: css.map 
      }).catch(err => console.error(err)),
    }),
    resolve({ jsnext: true, main: true }),
    commonjs({ include: 'node_modules/**' }),
    isProduction && buble({ exclude: 'node_modules/**' }),
    isProduction && uglify(),
  ],
  // Using custom watch options (https://rollupjs.org/#watch-options)
  // results in build no longer being triggered on any file change.
  // So resorting to `watch:css` script in package.json isntead.
  // watch: {
  //   chokidar: true,
  //   include: ['src/**/*.css', 'src/**/*.js'],
  //   exclude: 'node_modules/**',
  // },
}