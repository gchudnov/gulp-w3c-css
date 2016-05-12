# gulp-w3c-css [![Build Status](https://travis-ci.org/gchudnov/gulp-w3c-css.svg?branch=master)](https://travis-ci.org/gchudnov/gulp-w3c-css)
A Gulp plugin for CSS Validation using W3C CSS Validation Service

Depends on [w3c-css](https://github.com/gchudnov/w3c-css) package.

## Installation
```bash
$ npm install gulp-w3c-css
```


## Usage

Validate all `*.css` files in the `/css` directory and write results to the `/build` directory.
If there are no errors or warnings in a file, the resulting file will be empty. Otherwise the file will contain errors and warnings as JSON object:
```javascript
{ "errors":[ /* ... */ ],"warnings":[ /* ... */ ] }
```

```javascript
var validate = require('gulp-w3c-css');

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');

var srcPath = path.join(__dirname, './css/*.css');
var dstPath = path.join(__dirname, './build');

gulp.src(srcPath)
  .pipe(validate())
  .pipe(gulp.dest(dstPath));
```

OR

```javascript
var validate = require('gulp-w3c-css');

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');

var srcPath = path.join(__dirname, './css/*.css');

gulp.src(srcPath)
  .pipe(validate())
  .pipe(gutil.buffer(function(err, files) {
    // err - an error encountered
    // files - array of validation results
    // files[i].contents is empty if there are no errors or warnings found
  }));
```


## Arguments
The first argument to the validate function can be an options object with the following [properties](https://github.com/gchudnov/w3c-css#arguments):
* `sleep` - time to sleep _between_ the requests, milliseconds [default: 1500 -- 1.5 seconds]. This option is required if you intend to validate several CSS files at once. Make sure its value [is greater than 1 second](http://jigsaw.w3.org/css-validator/manual.html). Otherwise, consider using a [Private CSS Validator](https://github.com/gchudnov/w3c-css#private-css-validator) that doesn't have any request-frequency limitations. 
* `profile` - the CSS profile used for the validation: `css1, css2, css21, css3` [default: 'css3']
* `usermedium` - the medium used for the validation: `screen, print, ...` [default: 'all']
* `server` - the "IP:PORT" string or the [URL object](https://nodejs.org/api/url.html) of a custom validation server, e.g, `'172.17.0.2:8080'` or `{ host: '172.17.0.2:8080' }`.


## Contact

[Grigoriy Chudnov] (mailto:g.chudnov@gmail.com)


## License

Distributed under the [The MIT License (MIT)](https://github.com/gchudnov/w3c-css/blob/master/LICENSE).
