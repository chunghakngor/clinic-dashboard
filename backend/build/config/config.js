"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
var SERVER_PORT = 4000;
var MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
var SECRET = process.env.SECRET;
exports.default = {
    server: {
        hostname: SERVER_HOSTNAME,
        port: SERVER_PORT,
    },
    db: {
        url: MONGODB_CONNECTION,
    },
    bcrpt: {
        secret: SECRET,
    },
};
