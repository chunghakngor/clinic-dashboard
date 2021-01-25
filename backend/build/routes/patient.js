"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var patient_1 = __importDefault(require("../models/patient"));
var faker_1 = __importDefault(require("faker"));
var middlewear_1 = require("../middlewear");
var router = express_1.default.Router();
router.get("/", middlewear_1.verifyJWT, function (req, res) {
    patient_1.default.find({}, function (err, foundPatient) {
        (function (err) { return console.log(err); });
        res.status(200).json(foundPatient);
    });
});
router.post("/", middlewear_1.verifyJWT, function (req, res) {
    var data = {
        firstname: faker_1.default.name.firstName(),
        lastname: faker_1.default.name.lastName(),
        commission_rate: 3,
        price_quote: parseInt(faker_1.default.commerce.price()),
        first_contact: faker_1.default.date.recent(),
        deposit: faker_1.default.commerce.price(),
    };
    patient_1.default.create(data, function (err, newPatient) {
        (function (err) { return console.log(err); });
        res.json(newPatient);
    });
});
// ID ROUTES
router.get("/id/:id", middlewear_1.verifyJWT, function (req, res) {
    patient_1.default.findById(req.params.id, function (err, foundPatient) {
        (function (err) {
            return res.json({ success: false, message: req.params.id + " not found" });
        });
        if (foundPatient == undefined) {
            res.json({ success: false, message: req.params.id + " not found" });
        }
        else {
            res.json(foundPatient);
        }
    });
});
router.put("/id/:id", middlewear_1.verifyJWT, function (req, res) {
    patient_1.default.findByIdAndUpdate(req.params.id, req.body, function (err, updatedPatient) {
        (function (err) {
            return res
                .status(400)
                .json({ success: false, message: req.params.id + " not found first" });
        });
        if (updatedPatient == undefined) {
            res
                .status(400)
                .json({ success: false, message: req.params.id + " not found" });
        }
        else {
            res.json({
                success: true,
                message: req.params.id + " has been updated",
            });
        }
    });
});
router.delete("/id/:id", middlewear_1.verifyJWT, function (req, res) {
    patient_1.default.findByIdAndDelete(req.params.id, function (err, deletedPatient) {
        (function (err) {
            return res.status(400).json({
                success: false,
                message: req.params.id + " not found",
            });
        });
        if (deletedPatient == undefined || deletedPatient == null) {
            res.status(400).json({
                success: false,
                message: req.params.id + " not found",
            });
        }
        else {
            res.json({
                success: true,
                message: req.params.id + " has been deleted",
            });
        }
    });
});
exports.default = router;
