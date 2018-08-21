'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EasySave = function () {
  function EasySave(params) {
    var local = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aws';
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, EasySave);

    if (params === undefined) {
      throw new Error('First parameter is required');
    }
    this._local = local;
    this._target = target;
    if (this._local === 'aws') {
      if (params.AWS_S3_ACCESS_KEY === undefined || params.AWS_S3_ACCESS_KEY === null || params.AWS_S3_ACCESS_KEY === '' || params.AWS_S3_SECRET === '' || params.AWS_S3_SECRET === null || params.AWS_S3_SECRET === undefined) {
        throw new Error('AWS Key can not be empty');
      }
      _awsSdk2.default.config.accessKeyId = params.AWS_S3_ACCESS_KEY;
      _awsSdk2.default.config.secretAccessKey = params.AWS_S3_SECRET;
      this._params = new _awsSdk2.default.S3();
    } else {
      this._params = params;
    }
  }

  _createClass(EasySave, [{
    key: 'save',
    value: function save(file) {
      var _this = this;

      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'base64';


      return new Promise(function (resolve, reject) {
        var date = new Date();
        var ms = date.getTime();
        if (_this._local === 'aws') {

          var params = {
            Bucket: _this._target,
            Key: ms + '.' + input.file.ext,
            Body: file,
            ACL: 'authenticated-read',
            ContentEncoding: type,
            ContentType: input.file.type
          };

          s3.upload(params, function (err, data) {
            if (err) {
              reject('Error on send file to AWS', err);
            } else {
              resolve(data.Location);
            }
          });
        } else if (_this._local === 'local') {
          var folder = _os2.default.homedir() + '/uploads';
          var destine = folder + '/' + _this._target;
          if (!_fs2.default.existsSync(folder)) {
            _fs2.default.mkdirSync(folder);
          }
          if (!_fs2.default.existsSync(destine)) {
            _fs2.default.mkdirSync(destine);
          }
          _fs2.default.writeFile(destine + '/' + ms + '.' + input.file.ext, input.file.hash, { encoding: 'base64' }, function (err) {
            if (err) {
              reject('Error to write file on disk', err);
            } else {
              resolve(destine + '/' + ms + '.' + input.file.ext);
            }
          });
        }
      });
    }
  }, {
    key: 'getLocal',
    value: function getLocal() {
      return this._local;
    }
  }, {
    key: 'getTarget',
    value: function getTarget() {
      return this._target;
    }
  }, {
    key: 'getParams',
    value: function getParams() {
      return this._params;
    }
  }, {
    key: 'setLocal',
    value: function setLocal(local) {
      this._local = local;
    }
  }, {
    key: 'setTarget',
    value: function setTarget(target) {
      this.__target = target;
    }
  }, {
    key: 'setParams',
    value: function setParams(params) {
      this._params = params;
    }
  }]);

  return EasySave;
}();

exports.default = EasySave;