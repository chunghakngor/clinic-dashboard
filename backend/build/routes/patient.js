"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var patient_1 = __importDefault(require("../models/patient"));
var faker_1 = __importDefault(require("faker"));
var middlewear_1 = require("../middlewear");
var logger_1 = __importDefault(require("../config/logger"));
var NAMESPACE = "PATIENT";
var router = express_1.default.Router();
router.get("/", middlewear_1.verifyJWT, function (req, res) {
    logger_1.default.INFO(NAMESPACE, "METHOD: [" + req.method + "] - URL: [/patient" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    patient_1.default.find({}, function (err, foundPatient) {
        if (err) {
            logger_1.default.ERROR(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
        }
        else {
            res.status(200).json(foundPatient);
        }
    });
});
router.post("/", middlewear_1.verifyJWT, function (req, res) {
    var fakeData = { firstname: faker_1.default.name.findName(), deposit: faker_1.default.random.number(), lastname: faker_1.default.name.lastName(), price_quote: faker_1.default.random.number() };
    patient_1.default.create(fakeData, function (err, newPatient) {
        (function (err) { return console.log(err); });
        res.json(newPatient);
    });
});
/** Get Request with ID
 * Find the patient by their ID
 * return the Patient if found any patients
 */
router.get("/id/:id", middlewear_1.verifyJWT, function (req, res) {
    logger_1.default.INFO(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    patient_1.default.findById(req.params.id, function (err, foundPatient) {
        if (err) {
            logger_1.default.ERROR(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
            res.status(400).json({ success: false, message: "An error has occured" });
        }
        else if (foundPatient == undefined) {
            res.status(200).json({ success: false, message: req.params.id + " not found" });
        }
        else {
            res.status(200).json(foundPatient);
        }
    });
});
router.put("/id/:id", middlewear_1.verifyJWT, function (req, res) {
    logger_1.default.INFO(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    patient_1.default.findByIdAndUpdate(req.params.id, req.body, function (err, updatedPatient) {
        if (err) {
            logger_1.default.ERROR(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
            res.status(400).json({ success: false, message: req.params.id + " not found first" });
        }
        else if (updatedPatient == undefined) {
            res.status(200).json({ success: false, message: req.params.id + " not found" });
        }
        else {
            res.json({ success: true, message: req.params.id + " has been updated" });
        }
    });
});
router.delete("/id/:id", middlewear_1.verifyJWT, function (req, res) {
    logger_1.default.INFO(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    patient_1.default.findByIdAndDelete(req.params.id, function (err, deletedPatient) {
        if (err) {
            logger_1.default.ERROR(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
            res.status(400).json({ success: false, message: req.params.id + " not found" });
        }
        else if (deletedPatient == undefined || deletedPatient == null) {
            res.status(200).json({ success: false, message: req.params.id + " not found" });
        }
        else {
            res.status(200).json({ success: true, message: req.params.id + " has been deleted" });
        }
    });
});
exports.default = router;
