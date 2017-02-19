# gulp-boilerplate

Basically just a `gulpfile`.

## Features

* linting via [eslint](http://eslint.org/) and [stylelint](https://stylelint.io)
  * includes [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) and [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
* compiles JavaScript with [Babel](https://babeljs.io) and uses [Browserify](https://www.npmjs.com/package/browserify) to translate `require()`d modules
  * includes the [Babel ES2015 preset](https://npmjs.com/package/babel-preset-es2015)
* compiles CSS with [PostCSS](http://postcss.org)
  * includes [cssnext](https://cssnext.io) and [nested](https://www.npmjs.com/package/postcss-nested) plugins
* separate minified files via [uglify](https://www.npmjs.com/package/uglify) and [cssnano](https://www.npmjs.com/package/cssnano)
  * also builds separate sourcemap files

## Why?

* You want to write code and not waste time dealing with build tools
* You don't want to deal with Webpack
* You're not using React and don't need hot-module-reloading
  * This should still work with React though
