'use strict';

var through2 = require('through2');
var gutil = require('gulp-util');
var extend = require('lodash.assign');
var Buffer = require('buffer').Buffer;
var validator = require('w3c-css');

var PluginError = gutil.PluginError;

var TAG = 'gulp-w3c-css';


var validatePlugin = function (params) {
  params = params || {};
  var sleep = params.sleep || 1500;

  var lastCall;

  return through2.obj(function(file, enc, cb) {
    if(file.isNull()) {
      return cb(null, file);
    }

    if(file.isStream()) {
      return cb(new PluginError(TAG, 'Streaming not supported'));
    }

    var sleepValue = (lastCall ? ((Date.now() - lastCall) < sleep ? sleep : 0) : 0);

    var p = extend({ text: file.contents }, params);
    setTimeout(function() {
      validator.validate(p, function (err, data) {
        lastCall = Date.now();
        if(err) {
          cb(new PluginError(TAG, err));
        } else {
          file.contents = (data.errors.length || data.warnings.length) ? new Buffer(JSON.stringify(data)) : new Buffer(0);
          cb(null, file);
        }
      });
    }, sleepValue);
  });
};

module.exports = validatePlugin;
