import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import logger from "../config/logger";

const NAMESPACE = "Middlewear";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  jwt.verify(req.cookies.access_token, `${config.bcrypt.secret}`, (err: any, decoded: any) => {
    if (decoded != undefined) {
      next();
    } else {
      logger.ERROR(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
      res.status(401).json({ success: false, message: "Invalid token!" });
    }
  });
};
