'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fetch = _interopDefault(require('node-fetch'));

var apiUrl = "https://services.upstamps.com/api";

var UpStamps = /*#__PURE__*/function () {
  function UpStamps(_ref) {
    var clientId = _ref.clientId,
        projectKey = _ref.projectKey,
        envKey = _ref.envKey;
    this.clientId = clientId;
    this.projectKey = projectKey;
    this.envKey = envKey;
  }

  var _proto = UpStamps.prototype;

  _proto.flags = function flags(name) {
    try {
      var _this2 = this;

      var url = apiUrl + "/" + _this2.clientId + "/" + _this2.projectKey + "/" + _this2.envKey + "/flags";
      return Promise.resolve(fetch(url)).then(function (response) {
        return Promise.resolve(response.json()).then(function (_ref2) {
          var flags = _ref2.flags;
          var data = flags.map(function (item) {
            return item.name;
          });
          return data.indexOf(name) !== -1;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.remote = function remote(name) {
    try {
      var _this4 = this;

      var url = apiUrl + "/" + _this4.clientId + "/" + _this4.projectKey + "/" + _this4.envKey + "/remotes"; //Response with the all the remotes flags

      return Promise.resolve(fetch(url)).then(function (response) {
        return Promise.resolve(response.json()).then(function (_ref3) {
          var remotes = _ref3.remotes;
          var remote = remotes.filter(function (item) {
            return item.name === name;
          });
          var verifyRemote = remote.length > 0;
          return verifyRemote ? {
            show: true,
            data: remote[0].data
          } : {
            show: false
          };
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return UpStamps;
}();

exports.default = UpStamps;
//# sourceMappingURL=upstamps-js.cjs.development.js.map
