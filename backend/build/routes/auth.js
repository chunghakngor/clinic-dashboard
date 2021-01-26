"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = __importDefault(require("../models/user"));
var logger_1 = __importDefault(require("../config/logger"));
var config_1 = __importDefault(require("../config/config"));
var middlewear_1 = require("../middlewear");
var NAMESPACE = "AUTH";
var router = express_1.default.Router();
/** Validates the token that is POST to the /auth */
router.post("/", middlewear_1.verifyJWT, function (req, res) {
    res.status(200).json({ success: true, message: "Valid Token!" });
});
/** Function to find a single user and check their auth
 * If valid, then return a JSON Web Token with the userID, username and messsage
 * @param username: Username for the Login
 * @param password: Password for the Login
 * @returns void
 */
var findSingleUser = function (username, password, res) {
    user_1.default.findOne({ username: username }, function (err, foundUser) {
        if (err || foundUser == null) {
            res.status(401).json({ success: false, message: "Authentication failed! Please check your login details" });
        }
        else {
            bcrypt_1.default.compare(password, foundUser.password, function (err, result) {
                if (result) {
                    var jwtToken = jsonwebtoken_1.default.sign({ access: true }, "" + config_1.default.bcrypt.secret);
                    res.cookie("access_token", jwtToken).status(200).json({
                        success: true,
                        userID: foundUser._id,
                        username: foundUser.username,
                        message: "Authentication successful!",
                        token: jwtToken,
                    });
                }
                else {
                    res.status(401).json({ success: false, message: "Authentication failed! Please check your login details" });
                }
            });
        }
    });
};
/** POST Request to /auth/login
 * Check the user's login details via their username and password
 * If Valid, will send a JWT to the User
 */
router.post("/login", function (req, res) {
    logger_1.default.INFO(NAMESPACE, "METHOD: [/auth" + req.method + "] - URL: [/auth" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    if (req.body.password == "" || req.body.username == "") {
        logger_1.default.WARN(NAMESPACE, "METHOD: [/auth" + req.method + "] - URL: [/auth" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
        res.status(400).json({ success: false, message: "Authentication failed! Missing Username/Password" });
    }
    else {
        findSingleUser(req.body.username, req.body.password, res);
    }
});
/** Function to create a single user
 * @param userData: { username: Username for the account, password: Password for the account, email: Email for the account }
 * @returns void
 */
var registerSingleUser = function (userData, res) {
    user_1.default.create(userData, function (err, newUser) {
        if (err) {
            res.json({ success: false, message: "Invalid!" });
        }
        else {
            logger_1.default.INFO(NAMESPACE, "USER: [{newUser.username}:" + newUser._id + "] has been created");
            res.json({ success: true, message: newUser.username + ":" + newUser._id + " has been created" });
        }
    });
};
/** POST Request to /auth/register
 * Register a new user to the database
 * If valid, will send through the username:userID
 */
router.post("/register", function (req, res) {
    logger_1.default.INFO(NAMESPACE, "METHOD: [" + req.method + "] - URL: [/auth" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    bcrypt_1.default.hash(req.body.password, 10, function (err, passwordHash) {
        registerSingleUser({ username: req.body.username, password: passwordHash, email: req.body.email }, res);
    });
});
exports.default = router;
