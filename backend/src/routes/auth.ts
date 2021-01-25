import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../middlewear";
import config from "../config/config";

import User from "../models/user";
import { CallbackError } from "mongoose";
import logger from "../config/logger";

const router = express.Router();

const NAMESPACE = "AUTH";

router.post("/", verifyJWT, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Valid Token!",
  });
});

router.post("/login", (req, res) => {
  if (req.body.password == "" || req.body.username == "") {
    logger.WARN(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.status(400).json({
      success: false,
      message: "Authentication failed! Missing Username/Password",
    });
  } else {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (err || foundUser == null) {
        res.status(401).json({
          success: false,
          message: "Authentication failed! Please check your login details",
        });
      } else {
        bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ access: true }, `${config.bcrpt.secret}`);
            res.cookie("access_token", token).status(200).json({
              success: true,
              userID: foundUser._id,
              username: foundUser.username,
              message: "Authentication successful!",
              token: token,
            });
          } else {
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

router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    User.create(
      { username: req.body.username, password: hash, email: req.body.email },
      (err: CallbackError, newUser: any) => {
        if (err) {
          res.json({
            success: false,
            message: "Invalid!",
          });
        } else {
          res.json({
            success: true,
            message: `${newUser.username}:${newUser._id} has been created`,
          });
        }
      }
    );
  });
});

export default router;
