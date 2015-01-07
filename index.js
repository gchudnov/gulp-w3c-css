'use strict';

var es = require('event-stream');
var gutil = require('gulp-util');
var extend = require('lodash.assign');
var Buffer = require('buffer').Buffer;
var validator = require('w3c-css');

var PluginError = gutil.PluginError;

var TAG = 'gulp-w3c-css';


var validatePlugin = function (params) {
  params = params || {};

  return es.map(function (file, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(TAG, 'Streaming not supported'));
    }

    try {
      var p = extend({ text: file.contents }, params);
      validator.validate(p, function(err, data) {
        if(err) {
          cb(new PluginError(TAG, err));
        } else {
            file.contents = (data.errors.length || data.warnings.length) ? new Buffer(JSON.stringify(data)) : new Buffer(0);
            cb(null, file);
        }
      });
    } catch(err) {
      cb(new PluginError(TAG, err));
    }
  });
};

module.exports = validatePlugin;
