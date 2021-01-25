"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var middlewear_1 = require("../middlewear");
var config_1 = __importDefault(require("../config/config"));
var user_1 = __importDefault(require("../models/user"));
var logger_1 = __importDefault(require("../config/logger"));
var router = express_1.default.Router();
var NAMESPACE = "AUTH";
router.post("/", middlewear_1.verifyJWT, function (req, res) {
    res.status(200).json({
        success: true,
        message: "Valid Token!",
    });
});
router.post("/login", function (req, res) {
    if (req.body.password == "" || req.body.username == "") {
        logger_1.default.WARN(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
        res.status(400).json({
            success: false,
            message: "Authentication failed! Missing Username/Password",
        });
    }
    else {
        user_1.default.findOne({ username: req.body.username }, function (err, foundUser) {
            if (err || foundUser == null) {
                res.status(401).json({
                    success: false,
                    message: "Authentication failed! Please check your login details",
                });
            }
            else {
                bcrypt_1.default.compare(req.body.password, foundUser.password, function (err, result) {
                    if (result) {
                        var token = jsonwebtoken_1.default.sign({ access: true }, "" + config_1.default.bcrpt.secret);
                        res.cookie("access_token", token).status(200).json({
                            success: true,
                            userID: foundUser._id,
                            username: foundUser.username,
                            message: "Authentication successful!",
                            token: token,
                        });
                    }
                    else {
                        res.status(401).json({
                            success: false,
                            message: "Authentication failed! Please check your login details",
                        });
                    }
                });
            }
        });
    }
});
router.post("/register", function (req, res) {
    bcrypt_1.default.hash(req.body.password, 10, function (err, hash) {
        user_1.default.create({ username: req.body.username, password: hash, email: req.body.email }, function (err, newUser) {
            if (err) {
                res.json({
                    success: false,
                    message: "Invalid!",
                });
            }
            else {
                res.json({
                    success: true,
                    message: newUser.username + ":" + newUser._id + " has been created",
                });
            }
        });
    });
});
exports.default = router;
