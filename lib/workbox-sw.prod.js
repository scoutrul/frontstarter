var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

var WorkboxSW = function () {
  'use strict';

  var ErrorFactory$1 = function () {
    function ErrorFactory$1(a) {
      _classCallCheck(this, ErrorFactory$1);

      this._errors = a;
    }

    ErrorFactory$1.prototype.createError = function createError(a, b) {
      if (!(a in this._errors)) throw new Error('Unable to generate error \'' + a + '\'.');var c = this._errors[a].replace(/\s+/g, ' '),
          d = null;b && (c += ' [' + b.message + ']', d = b.stack);var e = new Error();return e.name = a, e.message = c, e.stack = d, e;
    };

    return ErrorFactory$1;
  }();

  var errors = { "not-in-sw": 'workbox-sw must be loaded in your service worker file.', "unsupported-route-type": 'The first parameter to registerRoute() should be either an Express-style path string, a RegExp, or a function.', "empty-express-string": 'The Express style route string must have some characters, an empty string is invalid.', "bad-revisioned-cache-list": 'The \'precache()\' method expects' + 'an array of revisioned urls like so: [\'/example/hello.1234.txt\', ' + '{path: \'hello.txt\', revision: \'1234\'}]', "navigation-route-url-string": 'The registerNavigationRoute() method ' + 'expects a URL string as its first parameter.', "bad-cache-id": 'The \'cacheId\' parameter must be a string with at least ' + 'one character', "bad-skip-waiting": 'The \'skipWaiting\' parameter must be a boolean.', "bad-clients-claim": 'The \'clientsClaim\' parameter must be a boolean.', "bad-directory-index": 'The \'directoryIndex\' parameter must be a boolean.' };var ErrorFactory = new ErrorFactory$1(errors);

  var LogGroup = function () {
    function LogGroup() {
      _classCallCheck(this, LogGroup);

      this._logs = [], this._childGroups = [], this._isFallbackMode = !1;var a = /Firefox\/(\d*)\.\d*/.exec(navigator.userAgent);if (a) try {
        var b = parseInt(a[1], 10);55 > b && (this._isFallbackMode = !0);
      } catch (a) {
        this._isFallbackMode = !0;
      }/Edge\/\d*\.\d*/.exec(navigator.userAgent) && (this._isFallbackMode = !0);
    }

    LogGroup.prototype.addPrimaryLog = function addPrimaryLog(a) {
      this._primaryLog = a;
    };

    LogGroup.prototype.addLog = function addLog(a) {
      this._logs.push(a);
    };

    LogGroup.prototype.addChildGroup = function addChildGroup(a) {
      0 === a._logs.length || this._childGroups.push(a);
    };

    LogGroup.prototype.print = function print() {
      var _console,
          _this = this;

      return 0 === this._logs.length && 0 === this._childGroups.length ? void this._printLogDetails(this._primaryLog) : void (this._primaryLog && (this._isFallbackMode ? this._printLogDetails(this._primaryLog) : (_console = console).groupCollapsed.apply(_console, this._getLogContent(this._primaryLog))), this._logs.forEach(function (a) {
        _this._printLogDetails(a);
      }), this._childGroups.forEach(function (a) {
        a.print();
      }), this._primaryLog && !this._isFallbackMode && console.groupEnd());
    };

    LogGroup.prototype._printLogDetails = function _printLogDetails(a) {
      var b = a.logFunc ? a.logFunc : console.log;b.apply(undefined, this._getLogContent(a));
    };

    LogGroup.prototype._getLogContent = function _getLogContent(a) {
      var b = a.message;this._isFallbackMode && 'string' == typeof b && (b = b.replace(/%c/g, ''));var c = [b];return !this._isFallbackMode && a.colors && (c = c.concat(a.colors)), a.args && (c = c.concat(a.args)), c;
    };

    return LogGroup;
  }();

  function isServiceWorkerGlobalScope() {
    return 'ServiceWorkerGlobalScope' in self && self instanceof ServiceWorkerGlobalScope;
  }function isDevBuild() {
    return 'dev' == 'prod';
  }function isLocalhost() {
    return !!('localhost' === location.hostname || '[::1]' === location.hostname || location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
  }

  self.workbox = self.workbox || {}, self.workbox.LOG_LEVEL = self.workbox.LOG_LEVEL || { none: -1, verbose: 0, debug: 1, warn: 2, error: 3 };var LIGHT_GREY = '#bdc3c7';var DARK_GREY = '#7f8c8d';var LIGHT_GREEN = '#2ecc71';var LIGHT_YELLOW = '#f1c40f';var LIGHT_RED = '#e74c3c';var LIGHT_BLUE = '#3498db';
  var LogHelper = function () {
    function LogHelper() {
      _classCallCheck(this, LogHelper);

      this._defaultLogLevel = isDevBuild() ? self.workbox.LOG_LEVEL.debug : self.workbox.LOG_LEVEL.warn;
    }

    LogHelper.prototype.log = function log(a) {
      this._printMessage(self.workbox.LOG_LEVEL.verbose, a);
    };

    LogHelper.prototype.debug = function debug(a) {
      this._printMessage(self.workbox.LOG_LEVEL.debug, a);
    };

    LogHelper.prototype.warn = function warn(a) {
      this._printMessage(self.workbox.LOG_LEVEL.warn, a);
    };

    LogHelper.prototype.error = function error(a) {
      this._printMessage(self.workbox.LOG_LEVEL.error, a);
    };

    LogHelper.prototype._printMessage = function _printMessage(a, b) {
      if (this._shouldLogMessage(a, b)) {
        var c = this._getAllLogGroups(a, b);c.print();
      }
    };

    LogHelper.prototype._getAllLogGroups = function _getAllLogGroups(a, b) {
      var _this2 = this;

      var c = new LogGroup(),
          d = this._getPrimaryMessageDetails(a, b);if (c.addPrimaryLog(d), b.error) {
        var _a = { message: b.error, logFunc: console.error };c.addLog(_a);
      }var e = new LogGroup();if (b.that && b.that.constructor && b.that.constructor.name) {
        var _a2 = b.that.constructor.name;e.addLog(this._getKeyValueDetails('class', _a2));
      }return b.data && ('object' != _typeof(b.data) || b.data instanceof Array ? e.addLog(this._getKeyValueDetails('additionalData', b.data)) : Object.keys(b.data).forEach(function (a) {
        e.addLog(_this2._getKeyValueDetails(a, b.data[a]));
      })), c.addChildGroup(e), c;
    };

    LogHelper.prototype._getKeyValueDetails = function _getKeyValueDetails(a, b) {
      return { message: '%c' + a + ': ', colors: ['color: ' + LIGHT_BLUE], args: b };
    };

    LogHelper.prototype._getPrimaryMessageDetails = function _getPrimaryMessageDetails(a, b) {
      var c = void 0,
          d = void 0;a === self.workbox.LOG_LEVEL.verbose ? (c = 'Info', d = LIGHT_GREY) : a === self.workbox.LOG_LEVEL.debug ? (c = 'Debug', d = LIGHT_GREEN) : a === self.workbox.LOG_LEVEL.warn ? (c = 'Warn', d = LIGHT_YELLOW) : a === self.workbox.LOG_LEVEL.error ? (c = 'Error', d = LIGHT_RED) : void 0;var e = '%c\uD83D\uDD27 %c[' + c + ']';var f = ['color: ' + LIGHT_GREY, 'color: ' + d];var g = void 0;return 'string' == typeof b ? g = b : b.message && (g = b.message), g && (g = g.replace(/\s+/g, ' '), e += '%c ' + g, f.push('color: ' + DARK_GREY + '; font-weight: normal')), { message: e, colors: f };
    };

    LogHelper.prototype._shouldLogMessage = function _shouldLogMessage(a, b) {
      if (!b) return !1;var c = this._defaultLogLevel;return self && self.workbox && 'number' == typeof self.workbox.logLevel && (c = self.workbox.logLevel), c === self.workbox.LOG_LEVEL.none || a < c ? !1 : !0;
    };

    return LogHelper;
  }();

  var logHelper = new LogHelper();

  var errors$1 = { "express-route-invalid-path": 'When using ExpressRoute, you must\n    provide a path that starts with a \'/\' character (to match same-origin\n    requests) or that starts with \'http\' (to match cross-origin requests)' };var ErrorFactory$3 = new ErrorFactory$1(errors$1);

  var ErrorStackParser = { parse: function parse() {
      return [];
    } };

  function atLeastOne(a) {
    var b = Object.keys(a);b.some(function (b) {
      return a[b] !== void 0;
    }) || throwError('Please set at least one of the following parameters: ' + b.map(function (a) {
      return '\'' + a + '\'';
    }).join(', '));
  }function hasMethod(a, b) {
    var c = Object.keys(a).pop(),
        d = _typeof(a[c][b]);'function' != d && throwError('The \'' + c + '\' parameter must be an object that exposes a\n      \'' + b + '\' method.');
  }function isInstance(a, b) {
    var c = Object.keys(a).pop();a[c] instanceof b || throwError('The \'' + c + '\' parameter must be an instance of\n      \'' + b.name + '\'');
  }function isOneOf(a, b) {
    var c = Object.keys(a).pop();b.includes(a[c]) || throwError('The \'' + c + '\' parameter must be set to one of the\n      following: ' + b);
  }function isType(a, b) {
    var c = Object.keys(a).pop(),
        d = _typeof(a[c]);d !== b && throwError('The \'' + c + '\' parameter has the wrong type. (Expected:\n      ' + b + ', actual: ' + d + ')');
  }function isArrayOfType(a, b) {
    var c = Object.keys(a).pop(),
        d = 'The \'' + c + '\' parameter should be an array containing\n    one or more \'' + b + '\' elements.';Array.isArray(a[c]) || throwError(d);for (var _iterator = a[c], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var e = _ref;
      (typeof e === 'undefined' ? 'undefined' : _typeof(e)) !== b && throwError(d);
    }
  }function isArrayOfClass(a, b) {
    var c = Object.keys(a).pop(),
        d = 'The \'' + c + '\' parameter should be an array containing\n    one or more \'' + b.name + '\' instances.';Array.isArray(a[c]) || throwError(d);for (var _iterator2 = a[c], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var e = _ref2;
      e instanceof b || throwError(d);
    }
  }function throwError(a) {
    a = a.replace(/\s+/g, ' ');var b = new Error(a);b.name = 'assertion-failed';var c = ErrorStackParser.parse(b);throw 3 <= c.length && (b.message = 'Invalid call to ' + c[2].functionName + '() \u2014 ' + a), b;
  }

  function normalizeHandler(a) {
    return 'object' == (typeof a === 'undefined' ? 'undefined' : _typeof(a)) ? (hasMethod({ handler: a }, 'handle'), a) : (isType({ handler: a }, 'function'), { handle: a });
  }

  var defaultMethod = 'GET';var validMethods = ['DELETE', 'GET', 'HEAD', 'POST', 'PUT'];

  var Route = function Route() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        a = _ref3.match,
        b = _ref3.handler,
        c = _ref3.method;

    _classCallCheck(this, Route);

    this.handler = normalizeHandler(b), isType({ match: a }, 'function'), this.match = a, c ? (isOneOf({ method: c }, validMethods), this.method = c) : this.method = defaultMethod;
  };

  var index$1 = Array.isArray || function (a) {
    return '[object Array]' == Object.prototype.toString.call(a);
  };

  var index = pathToRegexp;var parse_1 = parse;var compile_1 = compile;var tokensToFunction_1 = tokensToFunction;var tokensToRegExp_1 = tokensToRegExp;var PATH_REGEXP = new RegExp('(\\\\.)|([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))', 'g');function parse(a, b) {
    for (var c, d = [], e = 0, f = 0, g = '', h = b && b.delimiter || '/'; null != (c = PATH_REGEXP.exec(a));) {
      var i = c[0],
          j = c[1],
          k = c.index;if (g += a.slice(f, k), f = k + i.length, j) {
        g += j[1];continue;
      }var l = a[f],
          m = c[2],
          n = c[3],
          o = c[4],
          p = c[5],
          q = c[6],
          r = c[7];g && (d.push(g), g = '');var s = c[2] || h,
          t = o || p;d.push({ name: n || e++, prefix: m || '', delimiter: s, optional: '?' === q || '*' === q, repeat: '+' === q || '*' === q, partial: null != m && null != l && l !== m, asterisk: !!r, pattern: t ? escapeGroup(t) : r ? '.*' : '[^' + escapeString(s) + ']+?' });
    }return f < a.length && (g += a.substr(f)), g && d.push(g), d;
  }function compile(a, b) {
    return tokensToFunction(parse(a, b));
  }function encodeURIComponentPretty(a) {
    return encodeURI(a).replace(/[\/?#]/g, function (a) {
      return '%' + a.charCodeAt(0).toString(16).toUpperCase();
    });
  }function encodeAsterisk(a) {
    return encodeURI(a).replace(/[?#]/g, function (a) {
      return '%' + a.charCodeAt(0).toString(16).toUpperCase();
    });
  }function tokensToFunction(a) {
    for (var b = Array(a.length), c = 0; c < a.length; c++) {
      'object' == _typeof(a[c]) && (b[c] = new RegExp('^(?:' + a[c].pattern + ')$'));
    }return function (c, d) {
      for (var e, f = '', g = c || {}, h = d || {}, k = h.pretty ? encodeURIComponentPretty : encodeURIComponent, l = 0; l < a.length; l++) {
        if (e = a[l], 'string' == typeof e) {
          f += e;continue;
        }var i,
            m = g[e.name];if (null == m) if (e.optional) {
          e.partial && (f += e.prefix);continue;
        } else throw new TypeError('Expected "' + e.name + '" to be defined');if (index$1(m)) {
          if (!e.repeat) throw new TypeError('Expected "' + e.name + '" to not repeat, but received `' + JSON.stringify(m) + '`');if (0 === m.length) if (e.optional) continue;else throw new TypeError('Expected "' + e.name + '" to not be empty');for (var n = 0; n < m.length; n++) {
            if (i = k(m[n]), !b[l].test(i)) throw new TypeError('Expected all "' + e.name + '" to match "' + e.pattern + '", but received `' + JSON.stringify(i) + '`');f += (0 === n ? e.prefix : e.delimiter) + i;
          }continue;
        }if (i = e.asterisk ? encodeAsterisk(m) : k(m), !b[l].test(i)) throw new TypeError('Expected "' + e.name + '" to match "' + e.pattern + '", but received "' + i + '"');f += e.prefix + i;
      }return f;
    };
  }function escapeString(a) {
    return a.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
  }function escapeGroup(a) {
    return a.replace(/([=!:$\/()])/g, '\\$1');
  }function attachKeys(a, b) {
    return a.keys = b, a;
  }function flags(a) {
    return a.sensitive ? '' : 'i';
  }function regexpToRegexp(a, b) {
    var c = a.source.match(/\((?!\?)/g);if (c) for (var d = 0; d < c.length; d++) {
      b.push({ name: d, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, asterisk: !1, pattern: null });
    }return attachKeys(a, b);
  }function arrayToRegexp(a, b, c) {
    for (var d = [], e = 0; e < a.length; e++) {
      d.push(pathToRegexp(a[e], b, c).source);
    }var f = new RegExp('(?:' + d.join('|') + ')', flags(c));return attachKeys(f, b);
  }function stringToRegexp(a, b, c) {
    return tokensToRegExp(parse(a, c), b, c);
  }function tokensToRegExp(a, b, c) {
    index$1(b) || (c = b || c, b = []), c = c || {};for (var d, e = c.strict, f = !1 !== c.end, g = '', h = 0; h < a.length; h++) {
      if (d = a[h], 'string' == typeof d) g += escapeString(d);else {
        var i = escapeString(d.prefix),
            j = '(?:' + d.pattern + ')';b.push(d), d.repeat && (j += '(?:' + i + j + ')*'), j = d.optional ? d.partial ? i + '(' + j + ')?' : '(?:' + i + '(' + j + '))?' : i + '(' + j + ')', g += j;
      }
    }var k = escapeString(c.delimiter || '/'),
        l = g.slice(-k.length) === k;return e || (g = (l ? g.slice(0, -k.length) : g) + '(?:' + k + '(?=$))?'), g += f ? '$' : e && l ? '' : '(?=' + k + '|$)', attachKeys(new RegExp('^' + g, flags(c)), b);
  }function pathToRegexp(a, b, c) {
    return index$1(b) || (c = b || c, b = []), c = c || {}, a instanceof RegExp ? regexpToRegexp(a, b) : index$1(a) ? arrayToRegexp(a, b, c) : stringToRegexp(a, b, c);
  }index.parse = parse_1, index.compile = compile_1, index.tokensToFunction = tokensToFunction_1, index.tokensToRegExp = tokensToRegExp_1;

  var ExpressRoute = function (_Route) {
    _inherits(ExpressRoute, _Route);

    function ExpressRoute(_ref4) {
      var a = _ref4.path,
          b = _ref4.handler,
          c = _ref4.method;

      _classCallCheck(this, ExpressRoute);

      if (!(a.startsWith('/') || a.startsWith('http'))) throw ErrorFactory$3.createError('express-route-invalid-path');var d = [];var e = index(a, d);return _possibleConstructorReturn(this, _Route.call(this, { match: function match(_ref5) {
          var b = _ref5.url;
          if (a.startsWith('/') && b.origin !== location.origin) return null;var c = a.startsWith('/') ? b.pathname : b.href,
              f = c.match(e);if (!f) return null;var g = {};return d.forEach(function (a, b) {
            g[a.name] = f[b + 1];
          }), g;
        }, handler: b, method: c }));
    }

    return ExpressRoute;
  }(Route);

  var NavigationRoute = function (_Route2) {
    _inherits(NavigationRoute, _Route2);

    function NavigationRoute() {
      var _this4;

      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref6.whitelist,
          b = _ref6.blacklist,
          c = _ref6.handler;

      _classCallCheck(this, NavigationRoute);

      isArrayOfClass({ whitelist: a }, RegExp), b ? isArrayOfClass({ blacklist: b }, RegExp) : b = [];return _this4 = _possibleConstructorReturn(this, _Route2.call(this, { match: function match(_ref7) {
          var d = _ref7.event,
              e = _ref7.url;
          var f = void 0,
              g = !1;if ('navigate' === d.request.mode) {
            var _d = e.pathname + e.search;a.some(function (a) {
              return a.test(_d);
            }) ? b.some(function (a) {
              return a.test(_d);
            }) ? f = 'The navigation route is not being used, since the ' + 'request URL matches both the whitelist and blacklist.' : (f = 'The navigation route is being used.', g = !0) : f = 'The navigation route is not being used, since the ' + 'URL being navigated to doesn\'t match the whitelist.', logHelper.debug({ that: _this4, message: f, data: { "request-url": e.href, whitelist: a, blacklist: b, handler: c } });
          }return g;
        }, handler: c, method: 'GET' }));
    }

    return NavigationRoute;
  }(Route);

  var RegExpRoute = function (_Route3) {
    _inherits(RegExpRoute, _Route3);

    function RegExpRoute(_ref8) {
      var _this5;

      var a = _ref8.regExp,
          b = _ref8.handler,
          c = _ref8.method;

      _classCallCheck(this, RegExpRoute);

      isInstance({ regExp: a }, RegExp);return _this5 = _possibleConstructorReturn(this, _Route3.call(this, { match: function match(_ref9) {
          var b = _ref9.url;
          var c = a.exec(b.href);return c ? b.origin !== location.origin && 0 !== c.index ? (logHelper.debug({ that: _this5, message: 'Skipping route, because the RegExp match didn\'t occur ' + 'at the start of the URL.', data: { url: b.href, regExp: a } }), null) : c.slice(1) : null;
        }, handler: b, method: c }));
    }

    return RegExpRoute;
  }(Route);

  var Router$2 = function () {
    function Router$2() {
      _classCallCheck(this, Router$2);

      this._routes = new Map(), this._isListenerRegistered = !1;
    }

    Router$2.prototype.addFetchListener = function addFetchListener() {
      var _this6 = this;

      return this._isListenerRegistered ? (logHelper.warn({ that: this, message: 'addFetchListener() has already been called for this Router.' }), !1) : (this._isListenerRegistered = !0, self.addEventListener('fetch', function (a) {
        var b = _this6.handleRequest({ event: a });b && a.respondWith(b);
      }), !0);
    };

    Router$2.prototype.handleRequest = function handleRequest(_ref10) {
      var _this7 = this;

      var a = _ref10.event;
      isInstance({ event: a }, FetchEvent);var b = new URL(a.request.url);if (!b.protocol.startsWith('http')) return void logHelper.log({ that: this, message: 'The URL does not start with HTTP, so it can\'t be handled.', data: { request: a.request } });
      var _findHandlerAndParams2 = this._findHandlerAndParams({ event: a, url: b }),
          c = _findHandlerAndParams2.handler,
          d = _findHandlerAndParams2.params;

      if (!c && this.defaultHandler && (c = this.defaultHandler), c) {
        var e = c.handle({ url: b, event: a, params: d });return this.catchHandler && (e = e.catch(function (c) {
          return _this7.catchHandler.handle({ url: b, event: a, error: c });
        })), e;
      }
    };

    Router$2.prototype._findHandlerAndParams = function _findHandlerAndParams(_ref11) {
      var a = _ref11.event,
          b = _ref11.url;
      var c = this._routes.get(a.request.method) || [];for (var _iterator3 = c, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref12;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref12 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref12 = _i3.value;
        }

        var d = _ref12;
        var _c = d.match({ url: b, event: a });if (_c) return logHelper.log({ that: this, message: 'The router found a matching route.', data: { route: d, request: a.request } }), Array.isArray(_c) && 0 === _c.length ? _c = void 0 : _c.constructor === Object && 0 === Object.keys(_c).length && (_c = void 0), { params: _c, handler: d.handler };
      }return { handler: void 0, params: void 0 };
    };

    Router$2.prototype.setDefaultHandler = function setDefaultHandler() {
      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref13.handler;

      this.defaultHandler = normalizeHandler(a);
    };

    Router$2.prototype.setCatchHandler = function setCatchHandler() {
      var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref14.handler;

      this.catchHandler = normalizeHandler(a);
    };

    Router$2.prototype.registerRoutes = function registerRoutes() {
      var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref15.routes;

      isArrayOfClass({ routes: a }, Route);for (var _iterator4 = a, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref16;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref16 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref16 = _i4.value;
        }

        var b = _ref16;
        this._routes.has(b.method) || this._routes.set(b.method, []), this._routes.get(b.method).unshift(b);
      }
    };

    Router$2.prototype.registerRoute = function registerRoute() {
      var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref17.route;

      isInstance({ route: a }, Route), this.registerRoutes({ routes: [a] });
    };

    Router$2.prototype.unregisterRoutes = function unregisterRoutes() {
      var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref18.routes;

      isArrayOfClass({ routes: a }, Route);for (var _iterator5 = a, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref19;

        if (_isArray5) {
          if (_i5 >= _iterator5.length) break;
          _ref19 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done) break;
          _ref19 = _i5.value;
        }

        var b = _ref19;
        this._routes.has(b.method) || logHelper.error({ that: this, message: 'Can\'t unregister route; there are no ' + b.method + '\n            routes registered.', data: { route: b } });var _a3 = this._routes.get(b.method).indexOf(b);-1 < _a3 ? this._routes.get(b.method).splice(_a3, 1) : logHelper.error({ that: this, message: 'Can\'t unregister route; the route wasn\'t previously\n            registered.', data: { route: b } });
      }
    };

    Router$2.prototype.unregisterRoute = function unregisterRoute() {
      var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref20.route;

      isInstance({ route: a }, Route), this.unregisterRoutes({ routes: [a] });
    };

    return Router$2;
  }();

  var Router$$1 = function (_Router$) {
    _inherits(Router$$1, _Router$);

    function Router$$1(a, b) {
      var _this8;

      _classCallCheck(this, Router$$1);

      (_this8 = _possibleConstructorReturn(this, _Router$.call(this, { handleFetch: b })), _this8), _this8._revisionedCacheName = a;return _this8;
    }

    Router$$1.prototype.registerRoute = function registerRoute(a, b) {
      var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      'function' == typeof b && (b = { handle: b });var d = void 0;if ('string' == typeof a) {
        if (0 === a.length) throw ErrorFactory.createError('empty-express-string');var e = a.startsWith('http') ? new URL(a, location).pathname : a,
            f = e.match(/[*:?+]/);f && logHelper.warn({ message: 'registerRoute() was called with a string containing an ' + 'Express-style wildcard character. In the next version of ' + 'Workbox, Express-style wildcards won\'t be supported, and ' + 'strings will be treated a exact matches. Please switch to ' + 'regular expressions for equivalent behavior.', data: { "Path String": a, "Wildcard Character": f[0], "Learn More": 'https://goo.gl/xZMKEV' } }), d = new ExpressRoute({ path: a, handler: b, method: c });
      } else if (a instanceof RegExp) d = new RegExpRoute({ regExp: a, handler: b, method: c });else if ('function' == typeof a) d = new Route({ match: a, handler: b, method: c });else throw ErrorFactory.createError('unsupported-route-type');return _Router$.prototype.registerRoute.call(this, { route: d }), d;
    };

    Router$$1.prototype.registerNavigationRoute = function registerNavigationRoute(a) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if ('string' != typeof a) throw ErrorFactory.createError('navigation-route-url-string');var c = 'cacheName' in b ? b.cacheName : this._revisionedCacheName;_Router$.prototype.registerRoute.call(this, { route: new NavigationRoute({ handler: function handler() {
            return caches.match(a, { cacheName: c });
          }, whitelist: b.whitelist || [/./], blacklist: b.blacklist || [] }) });
    };

    return Router$$1;
  }(Router$2);

  var errors$2 = { "multiple-cache-will-update-plugins": 'You cannot register more than one plugin that implements cacheWillUpdate.', "multiple-cached-response-will-be-used-plugins": 'You cannot register more than one plugin that implements cachedResponseWillBeUsed.', "invalid-response-for-caching": 'The fetched response could not be cached due to an invalid response code.', "no-response-received": 'No response received; falling back to cache.', "bad-cache-id": 'The \'cacheId\' parameter must be a string with at least ' + 'one character.' };var ErrorFactory$4 = new ErrorFactory$1(errors$2);

  var CacheableResponse = function () {
    function CacheableResponse() {
      var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref21.statuses,
          b = _ref21.headers;

      _classCallCheck(this, CacheableResponse);

      atLeastOne({ statuses: a, headers: b }), a !== void 0 && isArrayOfType({ statuses: a }, 'number'), b !== void 0 && isType({ headers: b }, 'object'), this.statuses = a, this.headers = b;
    }

    CacheableResponse.prototype.isResponseCacheable = function isResponseCacheable() {
      var _this9 = this;

      var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref22.request,
          b = _ref22.response;

      isInstance({ response: b }, Response);var c = !0;if (this.statuses && (c = this.statuses.includes(b.status)), this.headers && c && (c = Object.keys(this.headers).some(function (a) {
        return b.headers.get(a) === _this9.headers[a];
      })), !c) {
        var _c2 = { response: b };this.statuses && (_c2['valid-status-codes'] = JSON.stringify(this.statuses)), this.headers && (_c2['valid-headers'] = JSON.stringify(this.headers)), a && (_c2.request = a), logHelper.debug({ message: 'The response does not meet the criteria for being added to the\n          cache.', data: _c2 });
      }return c;
    };

    return CacheableResponse;
  }();

  var CacheableResponsePlugin = function (_CacheableResponse) {
    _inherits(CacheableResponsePlugin, _CacheableResponse);

    function CacheableResponsePlugin() {
      _classCallCheck(this, CacheableResponsePlugin);

      return _possibleConstructorReturn(this, _CacheableResponse.apply(this, arguments));
    }

    CacheableResponsePlugin.prototype.cacheWillUpdate = function cacheWillUpdate() {
      var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref23.request,
          b = _ref23.response;

      return this.isResponseCacheable({ request: a, response: b });
    };

    return CacheableResponsePlugin;
  }(CacheableResponse);

  var getDefaultCacheName = function getDefaultCacheName() {
    var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        a = _ref24.cacheId;

    var b = 'workbox-runtime-caching';return a && (b = a + '-' + b), self && self.registration && (b += '-' + self.registration.scope), b;
  };
  var pluginCallbacks = ['cacheDidUpdate', 'cachedResponseWillBeUsed', 'cacheWillUpdate', 'fetchDidFail', 'requestWillFetch'];

  var cleanResponseCopy = function cleanResponseCopy(_ref25) {
    var a = _ref25.response;
    isInstance({ response: a }, Response);var b = a.clone(),
        c = 'body' in b ? Promise.resolve(b.body) : b.blob();return c.then(function (a) {
      return new Response(a, { headers: b.headers, status: b.status, statusText: b.statusText });
    });
  };

  var asyncToGenerator = function asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  };

  var RequestWrapper = function () {
    function RequestWrapper() {
      var _this11 = this;

      var _ref26 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref26.cacheName,
          b = _ref26.cacheId,
          c = _ref26.plugins,
          d = _ref26.fetchOptions,
          e = _ref26.matchOptions;

      _classCallCheck(this, RequestWrapper);

      if (b && ('string' != typeof b || 0 === b.length)) throw ErrorFactory$4.createError('bad-cache-id');a ? (isType({ cacheName: a }, 'string'), this.cacheName = a, b && (this.cacheName = b + '-' + this.cacheName)) : this.cacheName = getDefaultCacheName({ cacheId: b }), d && (isType({ fetchOptions: d }, 'object'), this.fetchOptions = d), e && (isType({ matchOptions: e }, 'object'), this.matchOptions = e), this.plugins = new Map(), c && (isArrayOfType({ plugins: c }, 'object'), c.forEach(function (a) {
        for (var _iterator6 = pluginCallbacks, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
          var _ref27;

          if (_isArray6) {
            if (_i6 >= _iterator6.length) break;
            _ref27 = _iterator6[_i6++];
          } else {
            _i6 = _iterator6.next();
            if (_i6.done) break;
            _ref27 = _i6.value;
          }

          var _b = _ref27;
          if ('function' == typeof a[_b]) {
            if (!_this11.plugins.has(_b)) _this11.plugins.set(_b, []);else if ('cacheWillUpdate' === _b) throw ErrorFactory$4.createError('multiple-cache-will-update-plugins');else if ('cachedResponseWillBeUsed' === _b) throw ErrorFactory$4.createError('multiple-cached-response-will-be-used-plugins');_this11.plugins.get(_b).push(a);
          }
        }
      })), this.plugins.has('cacheWillUpdate') && (this._userSpecifiedCachableResponsePlugin = this.plugins.get('cacheWillUpdate')[0]);
    }

    RequestWrapper.prototype.getDefaultCacheableResponsePlugin = function getDefaultCacheableResponsePlugin() {
      return this._defaultCacheableResponsePlugin || (this._defaultCacheableResponsePlugin = new CacheableResponsePlugin({ statuses: [200] })), this._defaultCacheableResponsePlugin;
    };

    RequestWrapper.prototype.getCache = function getCache() {
      var a = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = a._cache;

                if (_context.t0) {
                  _context.next = 5;
                  break;
                }

                _context.next = 4;
                return caches.open(a.cacheName);

              case 4:
                a._cache = _context.sent;

              case 5:
                return _context.abrupt('return', a._cache);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }))();
    };

    RequestWrapper.prototype.match = function match(_ref28) {
      var a = _ref28.request;
      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var c, d, e;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                atLeastOne({ request: a });_context2.next = 3;
                return b.getCache();

              case 3:
                c = _context2.sent;
                _context2.next = 6;
                return c.match(a, b.matchOptions);

              case 6:
                d = _context2.sent;

                if (!b.plugins.has('cachedResponseWillBeUsed')) {
                  _context2.next = 12;
                  break;
                }

                e = b.plugins.get('cachedResponseWillBeUsed')[0];
                _context2.next = 11;
                return e.cachedResponseWillBeUsed({ request: a, cache: c, cachedResponse: d, matchOptions: b.matchOptions, cacheName: b.cacheName });

              case 11:
                d = _context2.sent;

              case 12:
                return _context2.abrupt('return', d);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }))();
    };

    RequestWrapper.prototype.fetch = function (_fetch) {
      function fetch(_x15) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (_ref29) {
      var a = _ref29.request;
      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var c, _iterator7, _isArray7, _i7, _ref30, _c3, _b2, _iterator8, _isArray8, _i8, _ref31, _a4;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                'string' == typeof a ? a = new Request(a) : isInstance({ request: a }, Request);c = b.plugins.has('fetchDidFail') ? a.clone() : null;

                if (!b.plugins.has('requestWillFetch')) {
                  _context3.next = 21;
                  break;
                }

                _iterator7 = b.plugins.get('requestWillFetch'), _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();

              case 4:
                if (!_isArray7) {
                  _context3.next = 10;
                  break;
                }

                if (!(_i7 >= _iterator7.length)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('break', 21);

              case 7:
                _ref30 = _iterator7[_i7++];
                _context3.next = 14;
                break;

              case 10:
                _i7 = _iterator7.next();

                if (!_i7.done) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt('break', 21);

              case 13:
                _ref30 = _i7.value;

              case 14:
                _c3 = _ref30;
                _context3.next = 17;
                return _c3.requestWillFetch({ request: a });

              case 17:
                _b2 = _context3.sent;
                isInstance({ returnedRequest: _b2 }, Request), a = _b2;

              case 19:
                _context3.next = 4;
                break;

              case 21:
                _context3.prev = 21;
                _context3.next = 24;
                return fetch(a, b.fetchOptions);

              case 24:
                return _context3.abrupt('return', _context3.sent);

              case 27:
                _context3.prev = 27;
                _context3.t0 = _context3['catch'](21);

                if (!b.plugins.has('fetchDidFail')) {
                  _context3.next = 46;
                  break;
                }

                _iterator8 = b.plugins.get('fetchDidFail'), _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();

              case 31:
                if (!_isArray8) {
                  _context3.next = 37;
                  break;
                }

                if (!(_i8 >= _iterator8.length)) {
                  _context3.next = 34;
                  break;
                }

                return _context3.abrupt('break', 46);

              case 34:
                _ref31 = _iterator8[_i8++];
                _context3.next = 41;
                break;

              case 37:
                _i8 = _iterator8.next();

                if (!_i8.done) {
                  _context3.next = 40;
                  break;
                }

                return _context3.abrupt('break', 46);

              case 40:
                _ref31 = _i8.value;

              case 41:
                _a4 = _ref31;
                _context3.next = 44;
                return _a4.fetchDidFail({ request: c.clone() });

              case 44:
                _context3.next = 31;
                break;

              case 46:
                throw _context3.t0;

              case 47:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[21, 27]]);
      }))();
    });

    RequestWrapper.prototype.fetchAndCache = function fetchAndCache(_ref32) {
      var a = _ref32.request,
          b = _ref32.waitOnCache,
          c = _ref32.cacheKey,
          d = _ref32.cacheResponsePlugin,
          e = _ref32.cleanRedirects;
      var f = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var g, h, i, j, _b3;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                atLeastOne({ request: a });g = void 0;
                _context5.next = 4;
                return f.fetch({ request: a });

              case 4:
                h = _context5.sent;
                i = f._userSpecifiedCachableResponsePlugin || d || f.getDefaultCacheableResponsePlugin();
                _context5.next = 8;
                return i.cacheWillUpdate({ request: a, response: h });

              case 8:
                j = _context5.sent;

                if (!j) {
                  _context5.next = 21;
                  break;
                }

                if (!(e && h.redirected)) {
                  _context5.next = 16;
                  break;
                }

                _context5.next = 13;
                return cleanResponseCopy({ response: h });

              case 13:
                _context5.t0 = _context5.sent;
                _context5.next = 17;
                break;

              case 16:
                _context5.t0 = h.clone();

              case 17:
                _b3 = _context5.t0;
                g = f.getCache().then(function () {
                  var d = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(d) {
                    var e, g, _iterator9, _isArray9, _i9, _ref33, _a5;

                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            e = void 0;
                            g = c || a;
                            _context4.t0 = 'opaque' !== h.type && f.plugins.has('cacheDidUpdate');

                            if (!_context4.t0) {
                              _context4.next = 7;
                              break;
                            }

                            _context4.next = 6;
                            return f.match({ request: g });

                          case 6:
                            e = _context4.sent;

                          case 7:
                            _context4.next = 9;
                            return d.put(g, _b3);

                          case 9:
                            if (!f.plugins.has('cacheDidUpdate')) {
                              _context4.next = 26;
                              break;
                            }

                            _iterator9 = f.plugins.get('cacheDidUpdate'), _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();

                          case 11:
                            if (!_isArray9) {
                              _context4.next = 17;
                              break;
                            }

                            if (!(_i9 >= _iterator9.length)) {
                              _context4.next = 14;
                              break;
                            }

                            return _context4.abrupt('break', 26);

                          case 14:
                            _ref33 = _iterator9[_i9++];
                            _context4.next = 21;
                            break;

                          case 17:
                            _i9 = _iterator9.next();

                            if (!_i9.done) {
                              _context4.next = 20;
                              break;
                            }

                            return _context4.abrupt('break', 26);

                          case 20:
                            _ref33 = _i9.value;

                          case 21:
                            _a5 = _ref33;
                            _context4.next = 24;
                            return _a5.cacheDidUpdate({ cacheName: f.cacheName, oldResponse: e, newResponse: _b3, url: 'url' in g ? g.url : g });

                          case 24:
                            _context4.next = 11;
                            break;

                          case 26:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, this);
                  }));return function () {
                    return d.apply(this, arguments);
                  };
                }());_context5.next = 23;
                break;

              case 21:
                if (!(!j && b)) {
                  _context5.next = 23;
                  break;
                }

                throw ErrorFactory$4.createError('invalid-response-for-caching');

              case 23:
                _context5.t1 = b && g;

                if (!_context5.t1) {
                  _context5.next = 27;
                  break;
                }

                _context5.next = 27;
                return g;

              case 27:
                return _context5.abrupt('return', h);

              case 28:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }))();
    };

    return RequestWrapper;
  }();

  var Handler = function () {
    function Handler() {
      var _ref34 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref34.requestWrapper,
          b = _ref34.waitOnCache;

      _classCallCheck(this, Handler);

      this.requestWrapper = a ? a : new RequestWrapper(), this.waitOnCache = !!b;
    }

    Handler.prototype.handle = function handle() {
      var _ref35 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref35.event,
          b = _ref35.params;

      throw Error('This abstract method must be implemented in a subclass.');
    };

    return Handler;
  }();

  var CacheFirst = function (_Handler) {
    _inherits(CacheFirst, _Handler);

    function CacheFirst() {
      _classCallCheck(this, CacheFirst);

      return _possibleConstructorReturn(this, _Handler.apply(this, arguments));
    }

    CacheFirst.prototype.handle = function handle() {
      var _ref36 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref36.event;

      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var c;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                isInstance({ event: a }, FetchEvent);_context6.next = 3;
                return b.requestWrapper.match({ request: a.request });

              case 3:
                c = _context6.sent;
                _context6.t0 = c;

                if (_context6.t0) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 8;
                return b.requestWrapper.fetchAndCache({ request: a.request, waitOnCache: b.waitOnCache });

              case 8:
                _context6.t0 = _context6.sent;

              case 9:
                return _context6.abrupt('return', _context6.t0);

              case 10:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }))();
    };

    return CacheFirst;
  }(Handler);

  var CacheOnly = function (_Handler2) {
    _inherits(CacheOnly, _Handler2);

    function CacheOnly() {
      _classCallCheck(this, CacheOnly);

      return _possibleConstructorReturn(this, _Handler2.apply(this, arguments));
    }

    CacheOnly.prototype.handle = function handle() {
      var _ref37 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref37.event;

      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                isInstance({ event: a }, FetchEvent);
                _context7.next = 3;
                return b.requestWrapper.match({ request: a.request });

              case 3:
                return _context7.abrupt('return', _context7.sent);

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }))();
    };

    return CacheOnly;
  }(Handler);

  var NetworkFirst = function (_Handler3) {
    _inherits(NetworkFirst, _Handler3);

    function NetworkFirst() {
      var _this14;

      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, NetworkFirst);

      (_this14 = _possibleConstructorReturn(this, _Handler3.call(this, a)), _this14), _this14._cacheablePlugin = new CacheableResponsePlugin({ statuses: [0, 200] });var b = a.networkTimeoutSeconds;
      b && (isType({ networkTimeoutSeconds: b }, 'number'), _this14.networkTimeoutSeconds = b);return _this14;
    }

    NetworkFirst.prototype.handle = function handle() {
      var _ref38 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref38.event;

      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var c, d, e;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                isInstance({ event: a }, FetchEvent);c = [];
                d = void 0;
                b.networkTimeoutSeconds && c.push(new Promise(function (c) {
                  d = setTimeout(function () {
                    c(b.requestWrapper.match({ request: a.request }));
                  }, 1e3 * b.networkTimeoutSeconds);
                }));e = b.requestWrapper.fetchAndCache({ request: a.request, waitOnCache: b.waitOnCache, cacheResponsePlugin: b._cacheablePlugin }).then(function (a) {
                  return d && clearTimeout(d), a ? a : Promise.reject(ErrorFactory$4.createError('no-response-received'));
                }).catch(function () {
                  return b.requestWrapper.match({ request: a.request });
                });
                return _context8.abrupt('return', (c.push(e), Promise.race(c)));

              case 6:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }))();
    };

    return NetworkFirst;
  }(Handler);

  var NetworkOnly = function (_Handler4) {
    _inherits(NetworkOnly, _Handler4);

    function NetworkOnly() {
      _classCallCheck(this, NetworkOnly);

      return _possibleConstructorReturn(this, _Handler4.apply(this, arguments));
    }

    NetworkOnly.prototype.handle = function handle() {
      var _ref39 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref39.event;

      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                isInstance({ event: a }, FetchEvent);
                _context9.next = 3;
                return b.requestWrapper.fetch({ request: a.request });

              case 3:
                return _context9.abrupt('return', _context9.sent);

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }))();
    };

    return NetworkOnly;
  }(Handler);

  var StaleWhileRevalidate = function (_Handler5) {
    _inherits(StaleWhileRevalidate, _Handler5);

    function StaleWhileRevalidate() {
      var _this16;

      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, StaleWhileRevalidate);

      (_this16 = _possibleConstructorReturn(this, _Handler5.call(this, a)), _this16), _this16._cacheablePlugin = new CacheableResponsePlugin({ statuses: [0, 200] });return _this16;
    }

    StaleWhileRevalidate.prototype.handle = function handle() {
      var _ref40 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref40.event;

      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var c, d;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                isInstance({ event: a }, FetchEvent);c = b.requestWrapper.fetchAndCache({ request: a.request, waitOnCache: b.waitOnCache, cacheResponsePlugin: b._cacheablePlugin }).catch(function () {
                  return Response.error();
                });
                _context10.next = 4;
                return b.requestWrapper.match({ request: a.request });

              case 4:
                d = _context10.sent;
                _context10.t0 = d;

                if (_context10.t0) {
                  _context10.next = 10;
                  break;
                }

                _context10.next = 9;
                return c;

              case 9:
                _context10.t0 = _context10.sent;

              case 10:
                return _context10.abrupt('return', _context10.t0);

              case 11:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }))();
    };

    return StaleWhileRevalidate;
  }(Handler);

  var tmpIdbName = 'workbox-cache-expiration';self && self.registration && (tmpIdbName += '-' + self.registration.scope);var idbName = tmpIdbName;var idbVersion = 1;var urlPropertyName = 'url';var timestampPropertyName = 'timestamp';

  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var idb = createCommonjsModule(function (a) {
    'use strict';
    (function () {
      function b(a) {
        return Array.prototype.slice.call(a);
      }function c(a) {
        return new Promise(function (b, c) {
          a.onsuccess = function () {
            b(a.result);
          }, a.onerror = function () {
            c(a.error);
          };
        });
      }function d(a, b, d) {
        var e,
            f = new Promise(function (f, g) {
          e = a[b].apply(a, d), c(e).then(f, g);
        });return f.request = e, f;
      }function e(a, b, c) {
        var e = d(a, b, c);return e.then(function (a) {
          return a ? new k(a, e.request) : void 0;
        });
      }function f(a, b, c) {
        c.forEach(function (c) {
          Object.defineProperty(a.prototype, c, { get: function get() {
              return this[b][c];
            }, set: function set(a) {
              this[b][c] = a;
            } });
        });
      }function g(a, b, c, e) {
        e.forEach(function (e) {
          e in c.prototype && (a.prototype[e] = function () {
            return d(this[b], e, arguments);
          });
        });
      }function h(a, b, c, d) {
        d.forEach(function (d) {
          d in c.prototype && (a.prototype[d] = function () {
            return this[b][d].apply(this[b], arguments);
          });
        });
      }function i(a, b, c, d) {
        d.forEach(function (d) {
          d in c.prototype && (a.prototype[d] = function () {
            return e(this[b], d, arguments);
          });
        });
      }function j(a) {
        this._index = a;
      }function k(a, b) {
        this._cursor = a, this._request = b;
      }function l(a) {
        this._store = a;
      }function m(a) {
        this._tx = a, this.complete = new Promise(function (b, c) {
          a.oncomplete = function () {
            b();
          }, a.onerror = function () {
            c(a.error);
          }, a.onabort = function () {
            c(a.error);
          };
        });
      }function n(a, b, c) {
        this._db = a, this.oldVersion = b, this.transaction = new m(c);
      }function o(a) {
        this._db = a;
      }f(j, '_index', ['name', 'keyPath', 'multiEntry', 'unique']), g(j, '_index', IDBIndex, ['get', 'getKey', 'getAll', 'getAllKeys', 'count']), i(j, '_index', IDBIndex, ['openCursor', 'openKeyCursor']), f(k, '_cursor', ['direction', 'key', 'primaryKey', 'value']), g(k, '_cursor', IDBCursor, ['update', 'delete']), ['advance', 'continue', 'continuePrimaryKey'].forEach(function (a) {
        a in IDBCursor.prototype && (k.prototype[a] = function () {
          var b = this,
              d = arguments;return Promise.resolve().then(function () {
            return b._cursor[a].apply(b._cursor, d), c(b._request).then(function (a) {
              return a ? new k(a, b._request) : void 0;
            });
          });
        });
      }), l.prototype.createIndex = function () {
        return new j(this._store.createIndex.apply(this._store, arguments));
      }, l.prototype.index = function () {
        return new j(this._store.index.apply(this._store, arguments));
      }, f(l, '_store', ['name', 'keyPath', 'indexNames', 'autoIncrement']), g(l, '_store', IDBObjectStore, ['put', 'add', 'delete', 'clear', 'get', 'getAll', 'getKey', 'getAllKeys', 'count']), i(l, '_store', IDBObjectStore, ['openCursor', 'openKeyCursor']), h(l, '_store', IDBObjectStore, ['deleteIndex']), m.prototype.objectStore = function () {
        return new l(this._tx.objectStore.apply(this._tx, arguments));
      }, f(m, '_tx', ['objectStoreNames', 'mode']), h(m, '_tx', IDBTransaction, ['abort']), n.prototype.createObjectStore = function () {
        return new l(this._db.createObjectStore.apply(this._db, arguments));
      }, f(n, '_db', ['name', 'version', 'objectStoreNames']), h(n, '_db', IDBDatabase, ['deleteObjectStore', 'close']), o.prototype.transaction = function () {
        return new m(this._db.transaction.apply(this._db, arguments));
      }, f(o, '_db', ['name', 'version', 'objectStoreNames']), h(o, '_db', IDBDatabase, ['close']), ['openCursor', 'openKeyCursor'].forEach(function (a) {
        [l, j].forEach(function (c) {
          c.prototype[a.replace('open', 'iterate')] = function () {
            var c = b(arguments),
                d = c[c.length - 1],
                e = this._store || this._index,
                f = e[a].apply(e, c.slice(0, -1));f.onsuccess = function () {
              d(f.result);
            };
          };
        });
      }), [j, l].forEach(function (a) {
        a.prototype.getAll || (a.prototype.getAll = function (a, b) {
          var c = this,
              d = [];return new Promise(function (e) {
            c.iterateCursor(a, function (a) {
              return a ? (d.push(a.value), void 0 !== b && d.length == b ? void e(d) : void a.continue()) : void e(d);
            });
          });
        });
      });var p = { open: function open(a, b, c) {
          var e = d(indexedDB, 'open', [a, b]),
              f = e.request;return f.onupgradeneeded = function (a) {
            c && c(new n(f.result, a.oldVersion, f.transaction));
          }, e.then(function (a) {
            return new o(a);
          });
        }, delete: function _delete(a) {
          return d(indexedDB, 'deleteDatabase', [a]);
        } };a.exports = p, a.exports.default = a.exports;
    })();
  });

  var errors$3 = { "max-entries-or-age-required": 'Either the maxEntries or maxAgeSeconds\n    parameters (or both) are required when constructing Plugin.', "max-entries-must-be-number": 'The maxEntries parameter to the Plugin\n    constructor must either be a number or undefined.', "max-age-seconds-must-be-number": 'The maxAgeSeconds parameter to the Plugin\n    constructor must either be a number or undefined.' };var ErrorFactory$5 = new ErrorFactory$1(errors$3);

  var CacheExpiration = function () {
    function CacheExpiration() {
      var _ref41 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref41.maxEntries,
          b = _ref41.maxAgeSeconds;

      _classCallCheck(this, CacheExpiration);

      if (!(a || b)) throw ErrorFactory$5.createError('max-entries-or-age-required');if (a && 'number' != typeof a) throw ErrorFactory$5.createError('max-entries-must-be-number');if (b && 'number' != typeof b) throw ErrorFactory$5.createError('max-age-seconds-must-be-number');this.maxEntries = a, this.maxAgeSeconds = b, this._dbs = new Map(), this._caches = new Map(), this._expirationMutex = !1, this._timestampForNextRun = null;
    }

    CacheExpiration.prototype.getDB = function getDB() {
      var _ref42 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref42.cacheName;

      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var c, d;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                isType({ cacheName: a }, 'string');c = idbName + '-' + a;

                if (b._dbs.has(c)) {
                  _context11.next = 7;
                  break;
                }

                _context11.next = 5;
                return idb.open(c, idbVersion, function (b) {
                  var c = b.createObjectStore(a, { keyPath: urlPropertyName });c.createIndex(timestampPropertyName, timestampPropertyName, { unique: !1 });
                });

              case 5:
                d = _context11.sent;
                b._dbs.set(c, d);

              case 7:
                return _context11.abrupt('return', b._dbs.get(c));

              case 8:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }))();
    };

    CacheExpiration.prototype.getCache = function getCache() {
      var _ref43 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref43.cacheName;

      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var c;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(isType({ cacheName: a }, 'string'), !b._caches.has(a))) {
                  _context12.next = 5;
                  break;
                }

                _context12.next = 3;
                return caches.open(a);

              case 3:
                c = _context12.sent;
                b._caches.set(a, c);

              case 5:
                return _context12.abrupt('return', b._caches.get(a));

              case 6:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }))();
    };

    CacheExpiration.prototype.isResponseFresh = function isResponseFresh() {
      var _ref44 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref44.cacheName,
          b = _ref44.cachedResponse,
          c = _ref44.now;

      if (b && this.maxAgeSeconds) {
        isInstance({ cachedResponse: b }, Response);var d = b.headers.get('date');if (d) {
          'undefined' == typeof c && (c = Date.now());var _a6 = new Date(d),
              _b4 = _a6.getTime();return !!isNaN(_b4) || _b4 + 1e3 * this.maxAgeSeconds > c;
        }return this.expireEntries({ cacheName: a, now: c }), !0;
      }return !0;
    };

    CacheExpiration.prototype.updateTimestamp = function updateTimestamp() {
      var _ref45 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref45.cacheName,
          b = _ref45.url,
          c = _ref45.now;

      var d = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var _g$objectStore$put;

        var e, f, g;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                isType({ url: b }, 'string'), isType({ cacheName: a }, 'string');e = new URL(b, location);
                e.hash = '', 'undefined' == typeof c && (c = Date.now());_context13.next = 5;
                return d.getDB({ cacheName: a });

              case 5:
                f = _context13.sent;
                g = f.transaction(a, 'readwrite');
                g.objectStore(a).put((_g$objectStore$put = {}, _g$objectStore$put[timestampPropertyName] = c, _g$objectStore$put[urlPropertyName] = e.href, _g$objectStore$put));
                _context13.next = 10;
                return g.complete;

              case 10:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }))();
    };

    CacheExpiration.prototype.expireEntries = function expireEntries() {
      var _ref46 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref46.cacheName,
          b = _ref46.now;

      var c = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var d, e, f, _b5;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (!c._expirationMutex) {
                  _context14.next = 2;
                  break;
                }

                return _context14.abrupt('return', void (c._timestampForNextRun = b));

              case 2:
                c._expirationMutex = !0, isType({ cacheName: a }, 'string'), 'undefined' == typeof b && (b = Date.now());
                if (!c.maxAgeSeconds) {
                  _context14.next = 9;
                  break;
                }

                _context14.next = 6;
                return c.findOldEntries({ cacheName: a, now: b });

              case 6:
                _context14.t0 = _context14.sent;
                _context14.next = 10;
                break;

              case 9:
                _context14.t0 = [];

              case 10:
                d = _context14.t0;

                if (!c.maxEntries) {
                  _context14.next = 17;
                  break;
                }

                _context14.next = 14;
                return c.findExtraEntries({ cacheName: a });

              case 14:
                _context14.t1 = _context14.sent;
                _context14.next = 18;
                break;

              case 17:
                _context14.t1 = [];

              case 18:
                e = _context14.t1;
                f = [].concat(new Set(d.concat(e)));
                _context14.next = 22;
                return c.deleteFromCacheAndIDB({ cacheName: a, urls: f });

              case 22:
                0 < f.length && logHelper.debug({ that: c, message: 'Expired entries have been removed from the cache.', data: { cacheName: a, urls: f } });
                c._expirationMutex = !1;

                if (!c._timestampForNextRun) {
                  _context14.next = 27;
                  break;
                }

                _b5 = c._timestampForNextRun;
                return _context14.abrupt('return', (c._timestampForNextRun = null, c.expireEntries({ cacheName: a, now: _b5 })));

              case 27:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }))();
    };

    CacheExpiration.prototype.findOldEntries = function findOldEntries() {
      var _ref47 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref47.cacheName,
          b = _ref47.now;

      var c = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var d, e, f, g, h, i;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                isType({ cacheName: a }, 'string'), isType({ now: b }, 'number');d = b - 1e3 * c.maxAgeSeconds;
                e = [];
                _context15.next = 5;
                return c.getDB({ cacheName: a });

              case 5:
                f = _context15.sent;
                g = f.transaction(a, 'readonly');
                h = g.objectStore(a);
                i = h.index(timestampPropertyName);
                i.iterateCursor(function (a) {
                  a && (a.value[timestampPropertyName] < d && e.push(a.value[urlPropertyName]), a.continue());
                });
                _context15.next = 12;
                return g.complete;

              case 12:
                return _context15.abrupt('return', e);

              case 13:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }))();
    };

    CacheExpiration.prototype.findExtraEntries = function findExtraEntries() {
      var _ref48 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref48.cacheName;

      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var c, d, e, f, g, h;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                isType({ cacheName: a }, 'string');c = [];
                _context16.next = 4;
                return b.getDB({ cacheName: a });

              case 4:
                d = _context16.sent;
                e = d.transaction(a, 'readonly'), f = e.objectStore(a), g = f.index(timestampPropertyName);
                _context16.next = 8;
                return g.count();

              case 8:
                h = _context16.sent;
                h > b.maxEntries && (e = d.transaction(a, 'readonly'), f = e.objectStore(a), g = f.index(timestampPropertyName), g.iterateCursor(function (a) {
                  a && (c.push(a.value[urlPropertyName]), h - c.length > b.maxEntries && a.continue());
                }));
                _context16.next = 12;
                return e.complete;

              case 12:
                return _context16.abrupt('return', c);

              case 13:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }))();
    };

    CacheExpiration.prototype.deleteFromCacheAndIDB = function deleteFromCacheAndIDB() {
      var _ref49 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref49.cacheName,
          b = _ref49.urls;

      var c = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var d, e, _iterator10, _isArray10, _i10, _ref50, _c4, _b6, f;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!(isType({ cacheName: a }, 'string'), isArrayOfType({ urls: b }, 'string'), 0 < b.length)) {
                  _context17.next = 27;
                  break;
                }

                _context17.next = 3;
                return c.getCache({ cacheName: a });

              case 3:
                d = _context17.sent;
                _context17.next = 6;
                return c.getDB({ cacheName: a });

              case 6:
                e = _context17.sent;
                _iterator10 = b, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();

              case 8:
                if (!_isArray10) {
                  _context17.next = 14;
                  break;
                }

                if (!(_i10 >= _iterator10.length)) {
                  _context17.next = 11;
                  break;
                }

                return _context17.abrupt('break', 27);

              case 11:
                _ref50 = _iterator10[_i10++];
                _context17.next = 18;
                break;

              case 14:
                _i10 = _iterator10.next();

                if (!_i10.done) {
                  _context17.next = 17;
                  break;
                }

                return _context17.abrupt('break', 27);

              case 17:
                _ref50 = _i10.value;

              case 18:
                _c4 = _ref50;
                _context17.next = 21;
                return d.delete(_c4);

              case 21:
                _b6 = e.transaction(a, 'readwrite'), f = _b6.objectStore(a);
                f.delete(_c4);
                _context17.next = 25;
                return _b6.complete;

              case 25:
                _context17.next = 8;
                break;

              case 27:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }))();
    };

    return CacheExpiration;
  }();

  var CacheExpirationPlugin = function (_CacheExpiration) {
    _inherits(CacheExpirationPlugin, _CacheExpiration);

    function CacheExpirationPlugin() {
      _classCallCheck(this, CacheExpirationPlugin);

      return _possibleConstructorReturn(this, _CacheExpiration.apply(this, arguments));
    }

    CacheExpirationPlugin.prototype.cachedResponseWillBeUsed = function cachedResponseWillBeUsed() {
      var _ref51 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref51.cacheName,
          b = _ref51.cachedResponse,
          c = _ref51.now;

      return this.isResponseFresh({ cacheName: a, cachedResponse: b, now: c }) ? b : null;
    };

    CacheExpirationPlugin.prototype.cacheDidUpdate = function cacheDidUpdate() {
      var _ref52 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref52.cacheName,
          b = _ref52.newResponse,
          c = _ref52.url,
          d = _ref52.now;

      var e = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                isType({ cacheName: a }, 'string');
                isInstance({ newResponse: b }, Response);
                'undefined' == typeof d && (d = Date.now());
                _context18.next = 5;
                return e.updateTimestamp({ cacheName: a, url: c, now: d });

              case 5:
                _context18.next = 7;
                return e.expireEntries({ cacheName: a, now: d });

              case 7:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }))();
    };

    return CacheExpirationPlugin;
  }(CacheExpiration);

  var errors$4 = { "channel-name-required": 'The channelName parameter is required when\n    constructing a new BroadcastCacheUpdate instance.', "responses-are-same-parameters-required": 'The first, second, and\n    headersToCheck parameters must be valid when calling responsesAreSame()' };var ErrorFactory$6 = new ErrorFactory$1(errors$4);

  var cacheUpdatedMessageType = 'CACHE_UPDATED';
  var defaultHeadersToCheck = ['content-length', 'etag', 'last-modified'];
  var defaultSource = 'workbox-broadcast-cache-update';

  function broadcastUpdate() {
    var _ref53 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        a = _ref53.channel,
        b = _ref53.cacheName,
        c = _ref53.url,
        d = _ref53.source;

    isInstance({ channel: a }, BroadcastChannel), isType({ cacheName: b }, 'string'), isType({ source: d }, 'string'), isType({ url: c }, 'string'), a.postMessage({ type: cacheUpdatedMessageType, meta: d, payload: { cacheName: b, updatedUrl: c } });
  }

  function responsesAreSame() {
    var _ref54 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        a = _ref54.first,
        b = _ref54.second,
        c = _ref54.headersToCheck;

    if (!(a instanceof Response && b instanceof Response && c instanceof Array)) throw ErrorFactory$6.createError('responses-are-same-parameters-required');var d = c.some(function (c) {
      return a.headers.has(c) && b.headers.has(c);
    });return d ? c.every(function (c) {
      return a.headers.has(c) === b.headers.has(c) && a.headers.get(c) === b.headers.get(c);
    }) : (logHelper.log({ message: 'Unable to determine whether the response has been updated\n        because none of the headers that would be checked are present.', data: { "First Response": a, "Second Response": b, "Headers To Check": JSON.stringify(c) } }), !0);
  }

  var BroadcastCacheUpdate = function () {
    function BroadcastCacheUpdate() {
      var _ref55 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref55.channelName,
          b = _ref55.headersToCheck,
          c = _ref55.source;

      _classCallCheck(this, BroadcastCacheUpdate);

      if ('string' != typeof a || 0 === a.length) throw ErrorFactory$6.createError('channel-name-required');this.channelName = a, this.headersToCheck = b || defaultHeadersToCheck, this.source = c || defaultSource;
    }

    BroadcastCacheUpdate.prototype.notifyIfUpdated = function notifyIfUpdated(_ref56) {
      var a = _ref56.first,
          b = _ref56.second,
          c = _ref56.cacheName,
          d = _ref56.url;
      isType({ cacheName: c }, 'string'), responsesAreSame({ first: a, second: b, headersToCheck: this.headersToCheck }) || broadcastUpdate({ cacheName: c, url: d, channel: this.channel, source: this.source });
    };

    _createClass(BroadcastCacheUpdate, [{
      key: 'channel',
      get: function get() {
        return this._channel || (this._channel = new BroadcastChannel(this.channelName)), this._channel;
      }
    }]);

    return BroadcastCacheUpdate;
  }();

  var BroadcastCacheUpdatePlugin = function (_BroadcastCacheUpdate) {
    _inherits(BroadcastCacheUpdatePlugin, _BroadcastCacheUpdate);

    function BroadcastCacheUpdatePlugin() {
      _classCallCheck(this, BroadcastCacheUpdatePlugin);

      return _possibleConstructorReturn(this, _BroadcastCacheUpdate.apply(this, arguments));
    }

    BroadcastCacheUpdatePlugin.prototype.cacheDidUpdate = function cacheDidUpdate(_ref57) {
      var a = _ref57.cacheName,
          b = _ref57.oldResponse,
          c = _ref57.newResponse,
          d = _ref57.url;
      isType({ cacheName: a }, 'string'), isInstance({ newResponse: c }, Response), b && this.notifyIfUpdated({ cacheName: a, first: b, second: c, url: d });
    };

    return BroadcastCacheUpdatePlugin;
  }(BroadcastCacheUpdate);

  var Strategies = function () {
    function Strategies() {
      var _ref58 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref58.cacheId;

      _classCallCheck(this, Strategies);

      this._cacheId = a;
    }

    Strategies.prototype.cacheFirst = function cacheFirst(a) {
      return this._getCachingMechanism(CacheFirst, a);
    };

    Strategies.prototype.cacheOnly = function cacheOnly(a) {
      return this._getCachingMechanism(CacheOnly, a);
    };

    Strategies.prototype.networkFirst = function networkFirst(a) {
      return this._getCachingMechanism(NetworkFirst, a);
    };

    Strategies.prototype.networkOnly = function networkOnly(a) {
      return this._getCachingMechanism(NetworkOnly, a);
    };

    Strategies.prototype.staleWhileRevalidate = function staleWhileRevalidate(a) {
      return this._getCachingMechanism(StaleWhileRevalidate, a);
    };

    Strategies.prototype._getCachingMechanism = function _getCachingMechanism(a) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var c = { cacheExpiration: CacheExpirationPlugin, broadcastCacheUpdate: BroadcastCacheUpdatePlugin, cacheableResponse: CacheableResponsePlugin },
          d = { plugins: [] };b.excludeCacheId || (d.cacheId = this._cacheId), b.cacheName && (d.cacheName = b.cacheName);var e = Object.keys(c);return e.forEach(function (a) {
        if (b[a]) {
          var _e = c[a],
              f = b[a];d.plugins.push(new _e(f));
        }
      }), b.plugins && b.plugins.forEach(function (a) {
        d.plugins.push(a);
      }), b.requestWrapper = new RequestWrapper(d), new a(b);
    };

    return Strategies;
  }();

  var errorMessageFactory = function errorMessageFactory(a, b) {
    var c = 'An error was thrown by workbox with error code: ' + (';\'' + a + '\'');return b && (c += ' with extras: \'' + JSON.stringify(b) + '\''), c;
  };

  var WorkboxError = function (_Error) {
    _inherits(WorkboxError, _Error);

    function WorkboxError(a, b) {
      var _this19;

      _classCallCheck(this, WorkboxError);

      (_this19 = _possibleConstructorReturn(this, _Error.call(this)), _this19), _this19.name = a, _this19.message = errorMessageFactory(a, b), b && (_this19.extras = b);return _this19;
    }

    return WorkboxError;
  }(Error);

  var BaseCacheManager = function () {
    function BaseCacheManager() {
      var _ref59 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref59.cacheName,
          b = _ref59.cacheId,
          c = _ref59.plugins;

      _classCallCheck(this, BaseCacheManager);

      if (b && ('string' != typeof b || 0 === b.length)) throw new WorkboxError('bad-cache-id', { cacheId: b });this._entriesToCache = new Map(), this._requestWrapper = new RequestWrapper({ cacheName: a, cacheId: b, plugins: c, fetchOptions: { credentials: 'same-origin' } });
    }

    BaseCacheManager.prototype._addEntries = function _addEntries(a) {
      var _this20 = this;

      this._parsedCacheUrls = null, a.forEach(function (a) {
        _this20._addEntryToInstallList(_this20._parseEntry(a));
      });
    };

    BaseCacheManager.prototype.getCacheName = function getCacheName() {
      return this._requestWrapper.cacheName;
    };

    BaseCacheManager.prototype.getCachedUrls = function getCachedUrls() {
      return this._parsedCacheUrls || (this._parsedCacheUrls = Array.from(this._entriesToCache.keys()).map(function (a) {
        return new URL(a, location).href;
      })), this._parsedCacheUrls;
    };

    BaseCacheManager.prototype._addEntryToInstallList = function _addEntryToInstallList(a) {
      var b = a.entryID,
          c = this._entriesToCache.get(a.entryID);return c ? void this._onDuplicateInstallEntryFound(a, c) : void this._entriesToCache.set(b, a);
    };

    BaseCacheManager.prototype.install = function install() {
      var a = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var b;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                if (!(0 === a._entriesToCache.size)) {
                  _context19.next = 2;
                  break;
                }

                return _context19.abrupt('return', []);

              case 2:
                b = [];
                return _context19.abrupt('return', (a._entriesToCache.forEach(function (c) {
                  b.push(a._cacheEntry(c));
                }), Promise.all(b)));

              case 4:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }))();
    };

    BaseCacheManager.prototype._cacheEntry = function _cacheEntry(a) {
      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        var c, d;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return b._isAlreadyCached(a);

              case 2:
                c = _context20.sent;
                d = { url: a.request.url, revision: a.revision, wasUpdated: !c };

                if (!c) {
                  _context20.next = 6;
                  break;
                }

                return _context20.abrupt('return', d);

              case 6:
                _context20.prev = 6;
                _context20.next = 9;
                return b._requestWrapper.fetchAndCache({ request: a.getNetworkRequest(), waitOnCache: !0, cacheKey: a.request, cleanRedirects: !0 });

              case 9:
                _context20.next = 11;
                return b._onEntryCached(a);

              case 11:
                return _context20.abrupt('return', d);

              case 14:
                _context20.prev = 14;
                _context20.t0 = _context20['catch'](6);
                throw new WorkboxError('request-not-cached', { url: a.request.url, error: _context20.t0 });

              case 17:
              case 'end':
                return _context20.stop();
            }
          }
        }, _callee20, this, [[6, 14]]);
      }))();
    };

    BaseCacheManager.prototype.cleanup = function cleanup() {
      var a = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
        var b, c, d, e;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return caches.has(a.getCacheName());

              case 2:
                if (_context22.sent) {
                  _context22.next = 4;
                  break;
                }

                return _context22.abrupt('return');

              case 4:
                b = [];
                a._entriesToCache.forEach(function (a) {
                  b.push(a.request.url);
                });_context22.next = 8;
                return a._getCache();

              case 8:
                c = _context22.sent;
                _context22.next = 11;
                return c.keys();

              case 11:
                d = _context22.sent;
                e = d.filter(function (a) {
                  return !b.includes(a.url);
                });
                return _context22.abrupt('return', Promise.all(e.map(function () {
                  var b = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(b) {
                    return regeneratorRuntime.wrap(function _callee21$(_context21) {
                      while (1) {
                        switch (_context21.prev = _context21.next) {
                          case 0:
                            _context21.next = 2;
                            return c.delete(b);

                          case 2:
                            _context21.next = 4;
                            return a._onEntryDeleted(b.url);

                          case 4:
                          case 'end':
                            return _context21.stop();
                        }
                      }
                    }, _callee21, this);
                  }));return function () {
                    return b.apply(this, arguments);
                  };
                }())));

              case 14:
              case 'end':
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }))();
    };

    BaseCacheManager.prototype._getCache = function _getCache() {
      var a = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.t0 = a._cache;

                if (_context23.t0) {
                  _context23.next = 5;
                  break;
                }

                _context23.next = 4;
                return caches.open(a.getCacheName());

              case 4:
                a._cache = _context23.sent;

              case 5:
                return _context23.abrupt('return', a._cache);

              case 6:
              case 'end':
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }))();
    };

    BaseCacheManager.prototype._parseEntry = function _parseEntry() {
      throw new WorkboxError('requires-overriding');
    };

    BaseCacheManager.prototype._onDuplicateEntryFound = function _onDuplicateEntryFound() {
      throw new WorkboxError('requires-overriding');
    };

    BaseCacheManager.prototype._isAlreadyCached = function _isAlreadyCached() {
      throw new WorkboxError('requires-overriding');
    };

    BaseCacheManager.prototype._onEntryCached = function _onEntryCached() {
      throw new WorkboxError('requires-overriding');
    };

    BaseCacheManager.prototype._onEntryDeleted = function _onEntryDeleted() {
      throw new WorkboxError('requires-overriding');
    };

    return BaseCacheManager;
  }();

  var IDBHelper = function () {
    function IDBHelper(a, b, c) {
      _classCallCheck(this, IDBHelper);

      if (a == void 0 || b == void 0 || c == void 0) throw Error('name, version, storeName must be passed to the constructor.');this._name = a, this._version = b, this._storeName = c;
    }

    IDBHelper.prototype._getDb = function _getDb() {
      var _this21 = this;

      return this._dbPromise ? this._dbPromise : (this._dbPromise = idb.open(this._name, this._version, function (a) {
        a.createObjectStore(_this21._storeName);
      }).then(function (a) {
        return a;
      }), this._dbPromise);
    };

    IDBHelper.prototype.close = function close() {
      var _this22 = this;

      return this._dbPromise ? this._dbPromise.then(function (a) {
        a.close(), _this22._dbPromise = null;
      }) : void 0;
    };

    IDBHelper.prototype.put = function put(a, b) {
      var _this23 = this;

      return this._getDb().then(function (c) {
        var d = c.transaction(_this23._storeName, 'readwrite'),
            e = d.objectStore(_this23._storeName);return e.put(b, a), d.complete;
      });
    };

    IDBHelper.prototype.delete = function _delete(a) {
      var _this24 = this;

      return this._getDb().then(function (b) {
        var c = b.transaction(_this24._storeName, 'readwrite'),
            d = c.objectStore(_this24._storeName);return d.delete(a), c.complete;
      });
    };

    IDBHelper.prototype.get = function get(a) {
      var _this25 = this;

      return this._getDb().then(function (b) {
        return b.transaction(_this25._storeName).objectStore(_this25._storeName).get(a);
      });
    };

    IDBHelper.prototype.getAllValues = function getAllValues() {
      var _this26 = this;

      return this._getDb().then(function (a) {
        return a.transaction(_this26._storeName).objectStore(_this26._storeName).getAll();
      });
    };

    IDBHelper.prototype.getAllKeys = function getAllKeys() {
      var _this27 = this;

      return this._getDb().then(function (a) {
        return a.transaction(_this27._storeName).objectStore(_this27._storeName).getAllKeys();
      });
    };

    return IDBHelper;
  }();

  var cacheBustParamName = '_workbox-precaching';var version = 'v1';var dbName = 'workbox-precaching';var dbVersion = '1';var dbStorename = 'asset-revisions';var tmpRevisionedCacheName = 'workbox-precaching-revisioned-' + version;self && self.registration && (tmpRevisionedCacheName += '-' + self.registration.scope);var defaultRevisionedCacheName = tmpRevisionedCacheName;

  var RevisionDetailsModel = function () {
    function RevisionDetailsModel() {
      _classCallCheck(this, RevisionDetailsModel);

      this._idbHelper = new IDBHelper(dbName, dbVersion, dbStorename);
    }

    RevisionDetailsModel.prototype.get = function get(a) {
      return this._idbHelper.get(a);
    };

    RevisionDetailsModel.prototype.put = function put(a, b) {
      return this._idbHelper.put(a, b);
    };

    RevisionDetailsModel.prototype.delete = function _delete(a) {
      return this._idbHelper.delete(a);
    };

    RevisionDetailsModel.prototype._close = function _close() {
      this._idbHelper.close();
    };

    return RevisionDetailsModel;
  }();

  var BaseCacheEntry = function () {
    function BaseCacheEntry(_ref60) {
      var a = _ref60.entryID,
          b = _ref60.revision,
          c = _ref60.request,
          d = _ref60.cacheBust;

      _classCallCheck(this, BaseCacheEntry);

      this.entryID = a, this.revision = b, this.request = c, this.cacheBust = d;
    }

    BaseCacheEntry.prototype.getNetworkRequest = function getNetworkRequest() {
      if (!0 !== this.cacheBust) return this.request;var a = this.request.url;var b = {};if (!0 === this.cacheBust) if ('cache' in Request.prototype) b.cache = 'reload';else {
        var _b7 = new URL(a, location);_b7.search += (_b7.search ? '&' : '') + encodeURIComponent(cacheBustParamName) + '=' + encodeURIComponent(this.revision), a = _b7.toString();
      }return new Request(a, b);
    };

    return BaseCacheEntry;
  }();

  var StringCacheEntry = function (_BaseCacheEntry) {
    _inherits(StringCacheEntry, _BaseCacheEntry);

    function StringCacheEntry(a) {
      _classCallCheck(this, StringCacheEntry);

      if (isType({ url: a }, 'string'), 0 === a.length) throw new WorkboxError('invalid-string-entry', { url: a });return _possibleConstructorReturn(this, _BaseCacheEntry.call(this, { entryID: a, revision: a, request: new Request(a), cacheBust: !1 }));
    }

    return StringCacheEntry;
  }(BaseCacheEntry);

  var ObjectCacheEntry = function (_BaseCacheEntry2) {
    _inherits(ObjectCacheEntry, _BaseCacheEntry2);

    function ObjectCacheEntry(_ref61) {
      var a = _ref61.entryID,
          b = _ref61.revision,
          c = _ref61.url,
          d = _ref61.cacheBust;

      _classCallCheck(this, ObjectCacheEntry);

      if ('undefined' != typeof b && (isType({ revision: b }, 'string'), 0 === b.length)) throw new WorkboxError('invalid-object-entry', { problemParam: 'revision', problemValue: b });if ('undefined' == typeof d && (d = !!b), isType({ cacheBust: d }, 'boolean'), isType({ url: c }, 'string'), 0 === c.length) throw new WorkboxError('invalid-object-entry', { problemParam: 'url', problemValue: c });if ('undefined' == typeof a) a = new URL(c, location).toString();else if (0 === a.length) throw new WorkboxError('invalid-object-entry', { problemParam: 'entryID', problemValue: a });return _possibleConstructorReturn(this, _BaseCacheEntry2.call(this, { entryID: a, revision: b || c, request: new Request(c), cacheBust: d }));
    }

    return ObjectCacheEntry;
  }(BaseCacheEntry);

  var RevisionedCacheManager = function (_BaseCacheManager) {
    _inherits(RevisionedCacheManager, _BaseCacheManager);

    function RevisionedCacheManager() {
      var _this30;

      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, RevisionedCacheManager);

      a.cacheName = a.cacheName || defaultRevisionedCacheName, (_this30 = _possibleConstructorReturn(this, _BaseCacheManager.call(this, a)), _this30), _this30._revisionDetailsModel = new RevisionDetailsModel();return _this30;
    }

    RevisionedCacheManager.prototype.addToCacheList = function addToCacheList() {
      var _ref62 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref62.revisionedFiles;

      isInstance({ revisionedFiles: a }, Array), _BaseCacheManager.prototype._addEntries.call(this, a);var b = a.filter(function (a) {
        return 'string' == typeof a || !a.revision;
      });0 < b.length && logHelper.debug({ that: this, message: 'Some precache entries are URLs without separate revision\n          fields. If the URLs themselves do not contain revisioning info,\n          like a hash or a version number, your users won\'t receive updates.', data: { "URLs without revision fields": JSON.stringify(b), "Examples of safe, versioned URLs": '\'/path/file.abcd1234.css\' or \'/v1.0.0/file.js\'', "Examples of dangerous, unversioned URLs": '\'index.html\' or \'/path/file.css\' or \'/latest/file.js\'' } });
    };

    RevisionedCacheManager.prototype._parseEntry = function _parseEntry(a) {
      if (null === a) throw new WorkboxError('unexpected-precache-entry', { input: a });var b = void 0;switch (typeof a === 'undefined' ? 'undefined' : _typeof(a)) {case 'string':
          b = new StringCacheEntry(a);break;case 'object':
          b = new ObjectCacheEntry(a);break;default:
          throw new WorkboxError('unexpected-precache-entry', { input: a });}return b;
    };

    RevisionedCacheManager.prototype._onDuplicateInstallEntryFound = function _onDuplicateInstallEntryFound(a, b) {
      if (b.revision !== a.revision) throw new WorkboxError('duplicate-entry-diff-revisions', { firstEntry: { url: b.request.url, revision: b.revision }, secondEntry: { url: a.request.url, revision: a.revision } });
    };

    RevisionedCacheManager.prototype._isAlreadyCached = function _isAlreadyCached(a) {
      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
        var c, d, e;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return b._revisionDetailsModel.get(a.entryID);

              case 2:
                c = _context24.sent;

                if (!(c !== a.revision)) {
                  _context24.next = 5;
                  break;
                }

                return _context24.abrupt('return', !1);

              case 5:
                _context24.next = 7;
                return b._getCache();

              case 7:
                d = _context24.sent;
                _context24.next = 10;
                return d.match(a.request);

              case 10:
                e = _context24.sent;
                return _context24.abrupt('return', !!e);

              case 12:
              case 'end':
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }))();
    };

    RevisionedCacheManager.prototype._onEntryCached = function _onEntryCached(a) {
      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return b._revisionDetailsModel.put(a.entryID, a.revision);

              case 2:
              case 'end':
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }))();
    };

    RevisionedCacheManager.prototype._onEntryDeleted = function _onEntryDeleted(a) {
      var b = this;return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return b._revisionDetailsModel.delete(a);

              case 2:
              case 'end':
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }))();
    };

    RevisionedCacheManager.prototype._close = function _close() {
      this._revisionDetailsModel._close();
    };

    RevisionedCacheManager.prototype.cleanup = function cleanup() {
      var _this31 = this;

      return _BaseCacheManager.prototype.cleanup.call(this).then(function () {
        return _this31._close();
      });
    };

    RevisionedCacheManager.prototype._createLogFriendlyString = function _createLogFriendlyString(a) {
      var b = '\n';return a.forEach(function (a) {
        b += '    URL: \'' + a.url + '\' Revision: ' + ('\'' + a.revision + '\'\n');
      }), b;
    };

    RevisionedCacheManager.prototype.install = function install() {
      var _this32 = this;

      return _BaseCacheManager.prototype.install.call(this).then(function (a) {
        var b = [],
            c = [];a.forEach(function (a) {
          a.wasUpdated ? b.push({ url: a.url, revision: a.revision }) : c.push({ url: a.url, revision: a.revision });
        });var d = {};return 0 < b.length && (d['New / Updated Precache URL\'s'] = _this32._createLogFriendlyString(b)), 0 < c.length && (d['Up-to-date Precache URL\'s'] = _this32._createLogFriendlyString(c)), logHelper.log({ message: 'Precache Details: ' + b.length + ' requests ' + 'were added or updated and ' + (c.length + ' request are already ') + 'cached and up-to-date.', data: d }), a;
      });
    };

    return RevisionedCacheManager;
  }(BaseCacheManager);

  if (!isServiceWorkerGlobalScope()) throw new WorkboxError('not-in-sw');

  var WorkboxSW$1 = function () {
    function WorkboxSW$1() {
      var _ref63 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          a = _ref63.cacheId,
          b = _ref63.skipWaiting,
          c = _ref63.clientsClaim,
          _ref63$handleFetch = _ref63.handleFetch,
          d = _ref63$handleFetch === undefined ? !0 : _ref63$handleFetch,
          _ref63$directoryIndex = _ref63.directoryIndex,
          e = _ref63$directoryIndex === undefined ? 'index.html' : _ref63$directoryIndex,
          _ref63$precacheChanne = _ref63.precacheChannelName,
          f = _ref63$precacheChanne === undefined ? 'precache-updates' : _ref63$precacheChanne,
          _ref63$ignoreUrlParam = _ref63.ignoreUrlParametersMatching,
          g = _ref63$ignoreUrlParam === undefined ? [/^utm_/] : _ref63$ignoreUrlParam;

      _classCallCheck(this, WorkboxSW$1);

      if (!isServiceWorkerGlobalScope()) throw ErrorFactory.createError('not-in-sw');if (isDevBuild() && (isLocalhost() ? logHelper.debug({ message: 'Welcome to Workbox!', data: { "📖": 'Read the guides and documentation\nhttps://workboxjs.org/', "❓": 'Use the [workbox] tag on StackOverflow to ask questions\nhttps://stackoverflow.com/questions/ask?tags=workbox', "🐛": 'Found a bug? Report it on GitHub\nhttps://github.com/GoogleChrome/workbox/issues/new' } }) : logHelper.warn('This appears to be a production server. Please switch\n          to the smaller, optimized production build of Workbox.')), a && ('string' != typeof a || 0 === a.length)) throw ErrorFactory.createError('bad-cache-id');if (b && 'boolean' != typeof b) throw ErrorFactory.createError('bad-skip-waiting');if (c && 'boolean' != typeof c) throw ErrorFactory.createError('bad-clients-claim');if ('undefined' != typeof e) if (!1 === e || null === e) e = !1;else if ('string' != typeof e || 0 === e.length) throw ErrorFactory.createError('bad-directory-index');var h = [];f && h.push(new BroadcastCacheUpdatePlugin({ channelName: f, source: registration && registration.scope ? registration.scope : location })), this._runtimeCacheName = getDefaultCacheName({ cacheId: a }), this._revisionedCacheManager = new RevisionedCacheManager({ cacheId: a, plugins: h }), this._strategies = new Strategies({ cacheId: a }), this._precacheRouter = new Router$$1(this._revisionedCacheManager.getCacheName()), this._router = new Router$$1(this._revisionedCacheManager.getCacheName()), d && (this._precacheRouter.addFetchListener(), this._router.addFetchListener()), this._registerInstallActivateEvents(b, c), this._registerDefaultRoutes(g, e);
    }

    WorkboxSW$1.prototype.precache = function precache(a) {
      if (!Array.isArray(a)) throw ErrorFactory.createError('bad-revisioned-cache-list');this._revisionedCacheManager.addToCacheList({ revisionedFiles: a });
    };

    WorkboxSW$1.prototype._registerInstallActivateEvents = function _registerInstallActivateEvents(a, b) {
      var _this33 = this;

      self.addEventListener('install', function (b) {
        var c = _this33._revisionedCacheManager.getCachedUrls();0 < c.length && logHelper.debug({ that: _this33, message: 'The precached URLs will automatically be served using a\n            cache-first strategy.', data: { "Precached URLs": JSON.stringify(c) } }), b.waitUntil(_this33._revisionedCacheManager.install().then(function () {
          if (a) return self.skipWaiting();
        }));
      }), self.addEventListener('activate', function (a) {
        a.waitUntil(_this33._revisionedCacheManager.cleanup().then(function () {
          if (b) return self.clients.claim();
        }));
      });
    };

    WorkboxSW$1.prototype._registerDefaultRoutes = function _registerDefaultRoutes(a, b) {
      var _this34 = this;

      var c = [];(a || b) && c.push(this._getCacheMatchPlugin(a, b));var d = this.strategies.cacheFirst({ cacheName: this._revisionedCacheManager.getCacheName(), plugins: c, excludeCacheId: !0 });this._precacheRouter.registerRoute(function (_ref64) {
        var c = _ref64.url;
        c.hash = '';var d = _this34._revisionedCacheManager.getCachedUrls();if (-1 !== d.indexOf(c.href)) return !0;var e = _this34._removeIgnoreUrlParams(c.href, a);return -1 !== d.indexOf(e.href) || b && e.pathname.endsWith('/') && (e.pathname += b, -1 !== d.indexOf(e.href));
      }, d);
    };

    WorkboxSW$1.prototype._getCacheMatchPlugin = function _getCacheMatchPlugin(a, b) {
      var c = this;var d = function () {
        var d = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(_ref65) {
          var d = _ref65.request,
              e = _ref65.cache,
              f = _ref65.cachedResponse,
              g = _ref65.matchOptions;
          var h;
          return regeneratorRuntime.wrap(function _callee27$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  if (!f) {
                    _context27.next = 2;
                    break;
                  }

                  return _context27.abrupt('return', f);

                case 2:
                  h = c._removeIgnoreUrlParams(d.url, a);
                  return _context27.abrupt('return', e.match(h.toString(), g).then(function (a) {
                    return !a && h.pathname.endsWith('/') ? (h.pathname += b, e.match(h.toString(), g)) : a;
                  }));

                case 4:
                case 'end':
                  return _context27.stop();
              }
            }
          }, _callee27, this);
        }));return function () {
          return d.apply(this, arguments);
        };
      }();return { cachedResponseWillBeUsed: d };
    };

    WorkboxSW$1.prototype._removeIgnoreUrlParams = function _removeIgnoreUrlParams(a, b) {
      var c = new URL(a),
          d = c.search.slice(1),
          e = d.split('&'),
          f = e.map(function (a) {
        return a.split('=');
      }),
          g = f.filter(function (a) {
        return b.every(function (b) {
          return !b.test(a[0]);
        });
      }),
          h = g.map(function (a) {
        return a.join('=');
      });return c.search = h.join('&'), c;
    };

    _createClass(WorkboxSW$1, [{
      key: 'router',
      get: function get() {
        return this._router;
      }
    }, {
      key: 'strategies',
      get: function get() {
        return this._strategies;
      }
    }, {
      key: 'runtimeCacheName',
      get: function get() {
        return this._runtimeCacheName;
      }
    }]);

    return WorkboxSW$1;
  }();

  return WorkboxSW$1;
}();
//# sourceMappingURL=workbox-sw.prod.v2.1.2.js.map

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(WorkboxSW, 'WorkboxSW', 'src/workbox-sw.prod.js');
}();

;