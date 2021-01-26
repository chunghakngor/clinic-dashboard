"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
var SERVER_PORT = Number(String(process.env.SERVER_PORT)) || 4000;
var MONGODB_CONNECTION = process.env.MONGODB_CONNECTION || "mongodb://localhost:27017/clinic";
var SECRET = process.env.SECRET || "i5hQ62qn7#6UcaioO*bU%^";
exports.default = {
    server: {
        hostname: SERVER_HOSTNAME,
        port: SERVER_PORT,
    },
    db: {
        url: MONGODB_CONNECTION,
    },
    bcrypt: {
        secret: SECRET,
    },
};
