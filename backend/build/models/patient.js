"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var patientSchema = new mongoose_1.Schema({
    firstname: String,
    lastname: String,
    commission_rate: Number,
    price_quote: Number,
    first_contact: Date,
    comments: [{ body: String, date: Date }],
    consult_date: Date,
    deposit: Number,
    ht: Date,
    graft: Number,
    follow_up_2w: Date,
    follow_up_3m: Date,
    follow_up_6m: Date,
    follow_up_1y: Date,
    contact_method: [{ method: String, user_id: String, comments: String }],
    created: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model("Patient", patientSchema);
