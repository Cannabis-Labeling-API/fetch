"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPathComponents = exports.parsePathComponents = void 0;
var parsePathComponents = function (path, pathDefinition) {
    var keys = pathDefinition.split('/');
    var values = path.split('/');
    if (keys.length != values.length) {
        throw new Error("path and definition mismatch");
    }
    var variables = {};
    for (var i = 1; i < keys.length; i++) {
        var key = keys[i];
        var foundKey = false;
        if (key.indexOf('{') !== -1) {
            key = key.split('{')[1];
            key = key.split('}')[0];
            foundKey = true;
        }
        if (key.indexOf(':') !== -1) {
            key = key.split(':')[1];
            foundKey = true;
        }
        if (foundKey) {
            variables[key] = values[i];
        }
    }
    // console.log("Vars from", path, pathDefinition, variables)
    return variables;
};
exports.parsePathComponents = parsePathComponents;
var applyPathComponents = function (path, variables) {
    var pathComponents = path.split('/');
    if (pathComponents.length != pathComponents.length) {
        throw new Error("path and definition mismatch");
    }
    for (var i = 1; i < pathComponents.length; i++) {
        var key = pathComponents[i];
        var foundKey = false;
        if (key.indexOf('{') !== -1) {
            key = key.split('{')[1];
            key = key.split('}')[0];
            foundKey = true;
        }
        if (key.indexOf(':') !== -1) {
            key = key.split(':')[1];
            foundKey = true;
        }
        if (foundKey) {
            // console.log("foundKey", key)
            if (variables[key] !== undefined) {
                pathComponents[i] = variables[key];
            }
        }
    }
    // console.log("Vars to", variables, path, pathComponents.join('/'));
    return pathComponents.join('/');
};
exports.applyPathComponents = applyPathComponents;
//# sourceMappingURL=lib.js.map