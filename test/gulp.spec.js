'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var should = require('should');
var validate = require('../');
var assert = require('stream-assert');

/**
 * NOTE:
 * http://jigsaw.w3.org/css-validator/manual.html
 * ...please make sure that your script will sleep for at least 1 second between requests.
 * The CSS Validation service is a free, public service for all, your respect is appreciated. thanks.
 */
var TEST_DELAY = 1000;


describe('Document', function() {

  describe('Collection', function() {

    it("can be checked for errors and warnings", function(done) {
      setTimeout(function() {
        var srcPath = path.join(__dirname, './css/*.css');
        var dstPath = path.join(__dirname, './build');

        gulp.src(srcPath)
          .pipe(validate())
          .pipe(gulp.dest(dstPath))
          .pipe(assert.end(done));

      }, TEST_DELAY);
    });

  });

  describe('Errors', function() {

    it('can be detected', function(done) {
      setTimeout(function() {
        var srcPath = path.join(__dirname, './css/has-errors.css');
        gulp.src(srcPath)
          .pipe(validate())
          .pipe(gutil.buffer(function(err, files) {
            should.not.exist(err);
            should.exist(files);
            files.length.should.eql(1);

            var f = files[0];
            var data = JSON.parse(f.contents.toString());

            data.errors.should.be.instanceof(Array).and.have.lengthOf(1);

            done();
          }));
      }, TEST_DELAY);
    });

  });

  describe('Warnings', function() {

    it('can be detected', function(done) {
      setTimeout(function() {
        var srcPath = path.join(__dirname, './css/has-warnings.css');
        gulp.src(srcPath)
          .pipe(validate())
          .pipe(gutil.buffer(function(err, files) {
            should.not.exist(err);
            should.exist(files);
            files.length.should.eql(1);

            var f = files[0];
            var data = JSON.parse(f.contents.toString());

            data.warnings.should.be.instanceof(Array).and.have.lengthOf(1);

            done();
          }));
      }, TEST_DELAY);
    });

  });

  describe('OK-status', function() {

    it('can be detected', function(done) {
      setTimeout(function() {
        var srcPath = path.join(__dirname, './css/has-no-errors.css');
        gulp.src(srcPath)
          .pipe(validate())
          .pipe(gutil.buffer(function(err, files) {
            should.not.exist(err);
            should.exist(files);
            files.length.should.eql(1);

            var f = files[0];
            f.contents.toString().should.be.empty;

            done();
          }));
      }, TEST_DELAY);
    });

  });

});
