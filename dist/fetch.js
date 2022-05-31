"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uapiFetch = exports.getOptions = exports.getPostHeaders = void 0;
require("isomorphic-fetch");
// @ts-ignore
if (typeof globalThis.navigator === "undefined")
    globalThis.navigator = {};
function getPostHeaders(_a) {
    var baseHeaders = _a.baseHeaders, additionalHeaders = _a.additionalHeaders;
    var headersMap = __assign(__assign({}, (baseHeaders || {
        "Accept-Encoding": "gzip",
        Accept: "application/json",
        "Content-Type": "application/json",
    })), additionalHeaders);
    return headersMap;
}
exports.getPostHeaders = getPostHeaders;
var getOptions = function (_options) {
    var options;
    if (!_options || (typeof _options === 'string')) {
        options = {};
    }
    else {
        options = _options;
    }
    var baseHeaders = options.baseHeaders, additionalHeaders = options.additionalHeaders, apiKey = options.apiKey, _method = options.method, _body = options.body, mode = options.mode, passThrough = __rest(options, ["baseHeaders", "additionalHeaders", "apiKey", "method", "body", "mode"]);
    var method = _method || "GET";
    var isPost = ['put', 'post'].indexOf(method.toLowerCase()) !== -1;
    var headers = new Headers();
    var headersMap = isPost ? getPostHeaders({ baseHeaders: baseHeaders, additionalHeaders: additionalHeaders }) : __assign(__assign({}, (baseHeaders || {
        "Accept-Encoding": "gzip",
        "Accept": "*/*",
    })), additionalHeaders);
    for (var _i = 0, _a = Object.keys(headersMap); _i < _a.length; _i++) {
        var k = _a[_i];
        headers.append(k, headersMap[k]);
    }
    if (navigator && navigator.userAgent) {
        headers.append("User-Agent", navigator.userAgent);
    }
    if (apiKey) {
        var encoded = "Bearer " + apiKey;
        // Send both of these!!
        headers.append("Authorization", encoded);
    }
    var body;
    if (isPost) {
        if (typeof _body == 'string') {
            body = _body;
        }
        else if (_body) {
            body = JSON.stringify(_body);
        }
    }
    return __assign(__assign({}, passThrough), { method: method, body: body, headers: headers, mode: mode !== undefined ? mode : "cors", cache: "default" });
};
exports.getOptions = getOptions;
var uapiFetch = function (_options) {
    var _a = exports.getOptions(_options), uri = _a.uri, iFetchOptions = __rest(_a, ["uri"]);
    // console.log(iFetchOptions);
    return fetch(uri, iFetchOptions);
};
exports.uapiFetch = uapiFetch;
//# sourceMappingURL=fetch.js.map