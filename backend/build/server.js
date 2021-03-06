"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var config_1 = __importDefault(require("./config/config"));
var logger_1 = __importDefault(require("./config/logger"));
var auth_1 = __importDefault(require("./routes/auth"));
var patient_1 = __importDefault(require("./routes/patient"));
var app = express_1.default();
var NAMESPACE = "Server";
mongoose_1.default.connect(config_1.default.db.url, { useUnifiedTopology: true, useNewUrlParser: true });
// LOGGING
app.use(function (req, res, next) {
    logger_1.default.INFO(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    res.on("finish", function () {
        logger_1.default.INFO(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
    });
    next();
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
// replaced cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use("/auth", auth_1.default);
app.use("/patient", patient_1.default);
app.get("/", function (req, res) {
    res.status(200).json({ status: "active" });
});
// replaced app.get(*, (req, res))
app.use(function (req, res) {
    var error = new Error("Not found");
    res.status(404).json({
        message: error.message,
    });
});
app.listen(config_1.default.server.port, config_1.default.server.hostname, function () {
    logger_1.default.INFO(NAMESPACE, "Server is live on http://" + config_1.default.server.hostname + ":" + config_1.default.server.port);
});
