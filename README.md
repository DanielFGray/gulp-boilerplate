# gulp-boilerplate

Basically just a `gulpfile`.

## Features

* linting via eslint and stylelint
  * includes airbnb-base and stylelint-config-standard
* compiles JavaScript with Babel and uses Browserify to translate `require()`d modules
  * includes the Babel ES2015 preset
* compiles CSS with PostCSS
  * includes cssnext and `nested` plugins
* separate minified files via uglify and cssnano
  * also builds separate sourcemap files

## Why?

* You want to write code and not waste time dealing with build tools
* You don't want to deal with Webpack
* You're not using React and don't need hot-module-reloading
  * This should still work with React though
