"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var logger_1 = __importDefault(require("../config/logger"));
var NAMESPACE = "Middlewear";
var verifyJWT = function (req, res, next) {
    jsonwebtoken_1.default.verify(req.cookies.access_token, "" + config_1.default.bcrypt.secret, function (err, decoded) {
        if (decoded != undefined) {
            next();
        }
        else {
            logger_1.default.ERROR(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
            res.status(401).json({ success: false, message: "Invalid token!" });
        }
    });
};
exports.verifyJWT = verifyJWT;
