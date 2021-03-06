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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEndpointInfo = exports.getOptions = exports.uapiFetch = exports.putQr = exports.postQr = exports.getQr = exports.Endpoints = void 0;
var lib_1 = require("./lib");
var fetch_1 = require("./fetch");
Object.defineProperty(exports, "uapiFetch", { enumerable: true, get: function () { return fetch_1.uapiFetch; } });
Object.defineProperty(exports, "getOptions", { enumerable: true, get: function () { return fetch_1.getOptions; } });
var info = {};
exports.Endpoints = {
    case: {
        get: "case/{:id}",
        post: "case/{:id}",
    },
    each: {
        get: "each/{:id}",
        post: "each/{:id}",
    },
    regulator: {
        get: "regulator/{:id}",
        post: "regulator/{:id}",
    },
};
var getQr = function (qr, route, options) {
    if (route === void 0) { route = "case"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, endpoint, pathComponents, vars, qrPathDefinition, uri, endpointPathDefinition, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, exports.fetchEndpointInfo)(qr)];
                case 1:
                    _a = _b.sent(), endpoint = _a.endpoint, pathComponents = _a["path-components"];
                    vars = {};
                    qrPathDefinition = pathComponents;
                    uri = endpoint;
                    if (qrPathDefinition) {
                        vars = (0, lib_1.parsePathComponents)(qr, qrPathDefinition);
                        endpointPathDefinition = "".concat(endpoint, "/").concat(exports.Endpoints[route].get);
                        uri = (0, lib_1.applyPathComponents)(endpointPathDefinition, vars);
                    }
                    return [4 /*yield*/, (0, fetch_1.uapiFetch)(__assign({ uri: uri }, options))];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.getQr = getQr;
var postQr = function (qr, route, options) {
    if (route === void 0) { route = "case"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, endpoint, pathComponents, vars, qrPathDefinition, uri, endpointPathDefinition, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, exports.fetchEndpointInfo)(qr)];
                case 1:
                    _a = _b.sent(), endpoint = _a.endpoint, pathComponents = _a["path-components"];
                    vars = {};
                    qrPathDefinition = pathComponents;
                    uri = endpoint;
                    if (qrPathDefinition) {
                        vars = (0, lib_1.parsePathComponents)(qr, qrPathDefinition);
                        endpointPathDefinition = "".concat(endpoint, "/").concat(exports.Endpoints[route].get);
                        uri = (0, lib_1.applyPathComponents)(endpointPathDefinition, vars);
                    }
                    return [4 /*yield*/, (0, fetch_1.uapiFetch)(__assign({ uri: uri, method: "POST" }, options))];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.postQr = postQr;
exports.putQr = exports.postQr;
var fetchEndpointInfo = function (qr, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var url, endpoint, endpointInfo, res, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL(qr);
                if (info[url.host] !== undefined)
                    return [2 /*return*/, info[url.host]];
                endpoint = "https://".concat(url.host);
                endpointInfo = "".concat(endpoint, "/.well-known/cannabis-api.json");
                return [4 /*yield*/, fetch(endpointInfo)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                body = _a.sent();
                info[url.host] = body;
                return [2 /*return*/, info[url.host]];
        }
    });
}); };
exports.fetchEndpointInfo = fetchEndpointInfo;
//# sourceMappingURL=index.js.map