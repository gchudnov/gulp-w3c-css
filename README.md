# gulp-w3c-css
A Gulp plugin for CSS Validation using W3C CSS Validation Service

Depends on [w3c-css](https://github.com/gchudnov/w3c-css) package

```javascript
var validate = require('gulp-w3c-css');
```

## Usage

Validate all `*.css` files in the `/css` directory and write result to the `/build` directory.

```javascript
// If errors not found, the resulting file will be empty. Otherwise the file will contain errors and warnings found:
//   {"errors":[ ... ],"warnings":[ ... ] }

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');

var srcPath = path.join(__dirname, './css/*.css');
var dstPath = path.join(__dirname, './build');

gulp.src(srcPath)
  .pipe(validate())
  .pipe(gulp.dest(dstPath));
```

Validate files and return

```javascript
var srcPath = path.join(__dirname, './css/*.css');

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.src(srcPath)
  .pipe(validate())
  .pipe(gutil.buffer(function(err, files) {
    // err - an error encountered
    // files - array of files
    //         files[i].contents.toString() is empty if there are no errors or warnings in the file
  }));
```

## Contact

[Grigoriy Chudnov] (mailto:g.chudnov@gmail.com)


## License

Distributed under the [The MIT License (MIT)](https://github.com/gchudnov/w3c-css/blob/master/LICENSE).
