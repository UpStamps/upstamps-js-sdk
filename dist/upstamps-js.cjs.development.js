'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fetch = _interopDefault(require('node-fetch'));

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var emitterHandler = function emitterHandler(variant, name, url) {
  return Promise.resolve(_catch(function () {
    var post_body = {
      name: name,
      varA: variant === "A" ? 1 : 0,
      varB: variant === "B" ? 1 : 0
    };
    return Promise.resolve(fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(post_body)
    })).then(function (response) {
      return Promise.resolve(response.json());
    });
  }, function (e) {
    return e;
  }));
};
var queryBuilder = function queryBuilder(params) {
  var esc = encodeURIComponent;
  return Object.keys(params).filter(function (key) {
    return params[key] !== undefined && params[key] && params[key] !== null;
  }).map(function (key) {
    return esc(key) + "=" + esc(params[key]);
  }).join("&");
};

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

  _proto.scopes = function scopes(params) {
    try {
      var _this2 = this;

      return Promise.resolve(_catch(function () {
        var url = apiUrl + "/" + _this2.clientId + "/" + _this2.projectKey + "/scopes/add";
        return Promise.resolve(fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          body: JSON.stringify({
            name: params.name,
            email: params.email
          })
        })).then(function (response) {
          return Promise.resolve(response.json()).then(function (data) {
            if (data.response !== undefined && data.response.errors.length > 0) {
              return {
                error: true,
                message: "Uniqueness violation. duplicate email value violates unique constraint"
              };
            } else {
              return {
                error: false,
                success: true,
                message: "Scope created"
              };
            }
          });
        });
      }, function (e) {
        throw e;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.flag = function flag(name) {
    try {
      var _this4 = this;

      return Promise.resolve(_catch(function () {
        var url = apiUrl + "/" + _this4.clientId + "/" + _this4.projectKey + "/" + _this4.envKey + "/flags";
        return Promise.resolve(fetch(url)).then(function (response) {
          return Promise.resolve(response.json()).then(function (_ref2) {
            var flags = _ref2.flags;
            var data = flags.map(function (item) {
              return item.name;
            });
            return {
              show: data.indexOf(name) !== -1
            };
          });
        });
      }, function (e) {
        throw e;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.remote = function remote(name) {
    try {
      var _this6 = this;

      return Promise.resolve(_catch(function () {
        var url = apiUrl + "/" + _this6.clientId + "/" + _this6.projectKey + "/" + _this6.envKey + "/remotes"; //Response with the all the remotes flags

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
      }, function (e) {
        throw e;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.test = function test(name) {
    try {
      var _this8 = this;

      return Promise.resolve(_catch(function () {
        var variantTypes = ["A", "B"];
        var url = apiUrl + "/" + _this8.clientId + "/" + _this8.projectKey + "/" + _this8.envKey + "/testing";
        return Promise.resolve(fetch(url)).then(function (response) {
          return Promise.resolve(response.json()).then(function (_ref4) {
            var ABTesting = _ref4.ABTesting;
            var result = ABTesting.filter(function (item) {
              return item.name === name;
            });
            var show = result.length > 0;
            var randomVariant = Math.floor(Math.random() * variantTypes.length);

            var onEmitter = function onEmitter() {
              return Promise.resolve(_catch(function () {
                return Promise.resolve(emitterHandler(variantTypes[randomVariant], name, url));
              }, function (e) {
                return e;
              }));
            };

            return {
              show: show,
              variant: variantTypes[randomVariant],
              emitter: onEmitter
            };
          });
        });
      }, function (e) {
        throw e;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.segment = function segment(name, params) {
    try {
      var _this10 = this;

      return Promise.resolve(_catch(function () {
        var url = apiUrl + "/" + _this10.clientId + "/" + _this10.projectKey + "/" + _this10.envKey + "/segment";
        var query = queryBuilder({
          name: name,
          country: params.country,
          client: params.client,
          clientType: params.clientType
        });
        return Promise.resolve(fetch(url + "?" + query, {
          method: "GET"
        })).then(function (response) {
          return Promise.resolve(response.json()).then(function (_ref5) {
            var segment = _ref5.segment;
            return {
              show: segment.length > 0
            };
          });
        });
      }, function (e) {
        throw e;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return UpStamps;
}();

exports.default = UpStamps;
//# sourceMappingURL=upstamps-js.cjs.development.js.map
