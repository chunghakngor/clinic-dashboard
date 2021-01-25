import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config";
import logger from "./config/logger";

import authRoutes from "./routes/auth";
import patientRoutes from "./routes/patient";

const app = express();
const NAMESPACE = "Server";

// LOGGING
app.use((req, res, next) => {
  logger.INFO(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logger.INFO(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// replaced cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use("/auth", authRoutes);
// app.use("/patient", patientRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "active",
  });
});

// replaced app.get(*, (req, res))
app.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

app.listen(config.server.port, config.server.hostname, () => {
  logger.INFO(
    NAMESPACE,
    `Server is live on http://${config.server.hostname}:${config.server.port}`
  );
});
