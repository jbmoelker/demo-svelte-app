// based on https://github.com/voorhoede/front-end-tooling-recipes/blob/master/rollup-bundle-and-watch/
import buble from 'rollup-plugin-buble'           // https://buble.surge.sh/guide/
import commonjs from 'rollup-plugin-commonjs'     // https://github.com/rollup/rollup-plugin-commonjs
import resolve from 'rollup-plugin-node-resolve'  // https://github.com/rollup/rollup-plugin-node-resolve
import svelte from 'rollup-plugin-svelte'         // https://github.com/rollup/rollup-plugin-svelte
import uglify from 'rollup-plugin-uglify'         // https://github.com/TrySound/rollup-plugin-uglify

const isProduction = (process.env.NODE_ENV === 'production')

export default {
	entry: 'src/index.js',
	dest: 'dist/index.js',
  sourceMap: 'dist/index.js.map',
	format: 'iife',
	plugins: [
		svelte({
      css: (css) => css.write(`${__dirname}/dist/index.css`),
      cascade: false, // results in smaller CSS file
    }),
    resolve({ jsnext: true, main: true }),
    commonjs({ include: 'node_modules/**' }),
    isProduction && buble({ exclude: 'node_modules/**' }),
    isProduction && uglify(),
	]
}