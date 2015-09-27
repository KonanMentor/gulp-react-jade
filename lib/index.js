'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _through2 = require('through2');

var _through22 = _interopRequireDefault(_through2);

var _reactJade = require('react-jade');

var _reactJade2 = _interopRequireDefault(_reactJade);

var _reactJadeLibBrowserify = require('react-jade/lib/browserify');

var _reactJadeLibBrowserify2 = _interopRequireDefault(_reactJadeLibBrowserify);

var _stream = require('stream');

function getReadableFromString(str) {
  var stream = new _stream.Readable();
  stream._read = function () {};
  stream.push(str);
  stream.push(null);
  return stream;
}

exports['default'] = function (options) {
  return _through22['default'].obj(function (file, enc, callback) {
    var _this = this;

    if (file.isNull()) {
      this.push(file);
      callback();
    } else if (file.isBuffer()) {
      (function () {
        var stream = (0, _reactJadeLibBrowserify2['default'])(file.path);
        var res = '';
        stream.on('data', function (data) {
          return res += data;
        }).on('end', function () {
          file.contents = new Buffer(res);
          _this.push(file);
          callback();
        });

        getReadableFromString(file.contents.toString()).pipe(stream);
      })();
    } else if (file.isStream()) {
      throw new Error('Streams are not supported');
      callback();
    } else {
      callback();
    }
  });
};

module.exports = exports['default'];