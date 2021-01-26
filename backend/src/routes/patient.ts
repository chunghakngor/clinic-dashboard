import express from "express";

import Patient from "../models/patient";
import faker from "faker";
import { verifyJWT } from "../middlewear";
import logger from "../config/logger";

const NAMESPACE = "PATIENT";
const router = express.Router();

/** GET Request
 * Returns all the patients
 */
router.get("/", verifyJWT, (req, res) => {
  logger.INFO(NAMESPACE, `METHOD: [${req.method}] - URL: [/patient${req.url}] - IP: [${req.socket.remoteAddress}]`);
  Patient.find({}, (err, foundPatient) => {
    if (err) {
      logger.ERROR(NAMESPACE, `METHOD: [${req.method}] - URL: [/patient${req.url}] - IP: [${req.socket.remoteAddress}]`);
    } else {
      res.status(200).json(foundPatient);
    }
  });
});

/** POST Request
 * Create a new patient
 */
router.post("/", verifyJWT, (req, res) => {
  const fakeData = { firstname: faker.name.findName(), deposit: faker.random.number(), lastname: faker.name.lastName(), price_quote: faker.random.number() };
  Patient.create(fakeData, (err: any, newPatient: any) => {
    if (err) {
      logger.ERROR(NAMESPACE, `METHOD: [${req.method}] - URL: [/patient${req.url}] - IP: [${req.socket.remoteAddress}]`);
      res.status(400).json({ success: false, message: "An error has occured" });
    } else {
      logger.INFO(NAMESPACE, `PATIENT: New patient has been created ${newPatient._id}`);
      res.json(newPatient);
    }
  });
});

/** Get Request with ID
 * Find the patient by their ID
 * return the Patient if found any patients
 */
router.get("/id/:id", verifyJWT, (req, res) => {
  logger.INFO(NAMESPACE, `METHOD: [${req.method}] - URL: [/patient${req.url}] - IP: [${req.socket.remoteAddress}]`);
  Patient.findById(req.params.id, (err, foundPatient) => {
    if (err) {
      logger.ERROR(NAMESPACE, `METHOD: [${req.method}] - URL: [/patient${req.url}] - IP: [${req.socket.remoteAddress}]`);
      res.status(400).json({ success: false, message: "An error has occured" });
    } else if (foundPatient == undefined) {
      res.status(200).json({ success: false, message: `${req.params.id} not found` });
    } else {
      res.status(200).json(foundPatient);
    }
  });
});

/** PUT Request with ID
 * Edit the patient by their ID
 */
router.put("/id/:id", verifyJWT, (req, res) => {
  logger.INFO(NAMESPACE, `METHOD: [${req.method}] - URL: [/patient${req.url}] - IP: [${req.socket.remoteAddress}]`);
  Patient.findByIdAndUpdate(req.params.id, req.body, (err, updatedPatient) => {
    if (err) {
      logger.ERROR(NAMESPACE, `METHOD: [${req.method}] - URL: [/patient${req.url}] - IP: [${req.socket.remoteAddress}]`);
      res.status(400).json({ success: false, message: `${req.params.id} not found first` });
    } else if (updatedPatient == undefined) {
      res.status(200).json({ success: false, message: `${req.params.id} not found` });
    } else {
      res.json({ success: true, message: `${req.params.id} has been updated` });
    }
  });
});

/** DEL Request with ID
 * Delete the patient by their ID
 */
router.delete("/id/:id", verifyJWT, (req, res) => {
  logger.INFO(NAMESPACE, `METHOD: [${req.method}] - URL: [/patient${req.url}] - IP: [${req.socket.remoteAddress}]`);
  Patient.findByIdAndDelete(req.params.id, (err, deletedPatient) => {
    if (err) {
      logger.ERROR(NAMESPACE, `METHOD: [${req.method}] - URL: [/patient${req.url}] - IP: [${req.socket.remoteAddress}]`);
      res.status(400).json({ success: false, message: `${req.params.id} not found` });
    } else if (deletedPatient == undefined || deletedPatient == null) {
      res.status(200).json({ success: false, message: `${req.params.id} not found` });
    } else {
      res.status(200).json({ success: true, message: `${req.params.id} has been deleted` });
    }
  });
});

export default router;
