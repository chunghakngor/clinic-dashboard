import express, { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import logger from "../config/logger";
import config from "../config/config";

import { verifyJWT } from "../middlewear";
import { CallbackError } from "mongoose";
import { UserInterface } from "../models/user";

const NAMESPACE = "AUTH";
const router = express.Router();

/** Validates the token that is POST to the /auth */
router.post("/", verifyJWT, (req, res) => {
  res.status(200).json({ success: true, message: "Valid Token!" });
});

/** Function to find a single user and check their auth
 * If valid, then return a JSON Web Token with the userID, username and messsage
 * @param username: Username for the Login
 * @param password: Password for the Login
 * @returns void
 */
const findSingleUser = (username: string, password: string, res: Response<any>): void => {
  User.findOne({ username }, (err, foundUser) => {
    if (err || foundUser == null) {
      res.status(401).json({ success: false, message: "Authentication failed! Please check your login details" });
    } else {
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (result) {
          const jwtToken = jwt.sign({ access: true }, `${config.bcrypt.secret}`);
          res.cookie("access_token", jwtToken).status(200).json({
            success: true,
            userID: foundUser._id,
            username: foundUser.username,
            message: "Authentication successful!",
            token: jwtToken,
          });
        } else {
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
router.post("/login", (req, res) => {
  logger.INFO(NAMESPACE, `METHOD: [/auth${req.method}] - URL: [/auth${req.url}] - IP: [${req.socket.remoteAddress}]`);
  if (req.body.password == "" || req.body.username == "") {
    logger.WARN(NAMESPACE, `METHOD: [/auth${req.method}] - URL: [/auth${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.status(400).json({ success: false, message: "Authentication failed! Missing Username/Password" });
  } else {
    findSingleUser(req.body.username, req.body.password, res);
  }
});

/** Interface for the Register Request */
interface RegisterInterface {
  username: string;
  password: string;
  email: string;
}

/** Function to create a single user
 * @param userData: { username: Username for the account, password: Password for the account, email: Email for the account }
 * @returns void
 */
const registerSingleUser = (userData: RegisterInterface, res: Response<any>): void => {
  User.create(userData, (err: CallbackError, newUser: UserInterface) => {
    if (err) {
      res.json({ success: false, message: "Invalid!" });
    } else {
      logger.INFO(NAMESPACE, `USER: [{newUser.username}:${newUser._id}] has been created`);
      res.json({ success: true, message: `${newUser.username}:${newUser._id} has been created` });
    }
  });
};

/** POST Request to /auth/register
 * Register a new user to the database
 * If valid, will send through the username:userID
 */
router.post("/register", (req, res) => {
  logger.INFO(NAMESPACE, `METHOD: [${req.method}] - URL: [/auth${req.url}] - IP: [${req.socket.remoteAddress}]`);
  bcrypt.hash(req.body.password, 10, (err, passwordHash) => {
    registerSingleUser({ username: req.body.username, password: passwordHash, email: req.body.email }, res);
  });
});

export default router;
