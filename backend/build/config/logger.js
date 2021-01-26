"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTimeStamp = function () {
    return new Date().toISOString();
};
var INFO = function (namespace, message, object) {
    if (object) {
        console.info("[" + getTimeStamp() + "] [INFO] [" + namespace + "] " + message, object);
    }
    else {
        console.info("[" + getTimeStamp() + "] [INFO] [" + namespace + "] " + message);
    }
};
var WARN = function (namespace, message, object) {
    if (object) {
        console.warn("[" + getTimeStamp() + "] [WARN] [" + namespace + "] " + message, object);
    }
    else {
        console.warn("[" + getTimeStamp() + "] [WARN] [" + namespace + "] " + message);
    }
};
var ERROR = function (namespace, message, object) {
    if (object) {
        console.error("[" + getTimeStamp() + "] [ERROR] [" + namespace + "] " + message, object);
    }
    else {
        console.error("[" + getTimeStamp() + "] [ERROR] [" + namespace + "] " + message);
    }
};
exports.default = { INFO: INFO, WARN: WARN, ERROR: ERROR, getTimeStamp: getTimeStamp };
