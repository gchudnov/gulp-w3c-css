# gulp-w3c-css
A Gulp plugin for CSS Validation using W3C CSS Validation Service

Depends on [w3c-css](https://github.com/gchudnov/w3c-css) package.

```javascript
var validate = require('gulp-w3c-css');
```

## Usage

Validate all `*.css` files in the `/css` directory and write results to the `/build` directory.
If there are no errors or warnings in a file, the resulting file will be empty. Otherwise the file will contain errors and warnings as JSON object:
```javascript
{ "errors":[ /* ... */ ],"warnings":[ /* ... */ ] }
```

```javascript
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');

var srcPath = path.join(__dirname, './css/*.css');
var dstPath = path.join(__dirname, './build');

gulp.src(srcPath)
  .pipe(validate())
  .pipe(gulp.dest(dstPath));
```



```javascript
var srcPath = path.join(__dirname, './css/*.css');

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');

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
* profile - the CSS profile used for the validation: css1, css2, css21, css3 [default: 'css3']
* usermedium - the medium used for the validation: screen, print, ... [default: 'all']


## Contact

[Grigoriy Chudnov] (mailto:g.chudnov@gmail.com)


## License

Distributed under the [The MIT License (MIT)](https://github.com/gchudnov/w3c-css/blob/master/LICENSE).
