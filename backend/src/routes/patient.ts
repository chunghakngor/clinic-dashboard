import express from "express";

import Patient from "../models/patient";
import faker from "faker";
import { verifyJWT } from "../middlewear";

const router = express.Router();

router.get("/", verifyJWT, (req, res) => {
  Patient.find({}, (err, foundPatient) => {
    (err: any) => console.log(err);
    res.status(200).json(foundPatient);
  });
});

router.post("/", verifyJWT, (req, res) => {
  const data = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    commission_rate: 3,
    price_quote: parseInt(faker.commerce.price()),
    first_contact: faker.date.recent(),
    deposit: faker.commerce.price(),
  };
  Patient.create(data, (err: any, newPatient: any) => {
    (err: any) => console.log(err);
    res.json(newPatient);
  });
});

// ID ROUTES

router.get("/id/:id", verifyJWT, (req, res) => {
  Patient.findById(req.params.id, (err, foundPatient) => {
    (err) =>
      res.json({ success: false, message: `${req.params.id} not found` });
    if (foundPatient == undefined) {
      res.json({ success: false, message: `${req.params.id} not found` });
    } else {
      res.json(foundPatient);
    }
  });
});

router.put("/id/:id", verifyJWT, (req, res) => {
  Patient.findByIdAndUpdate(req.params.id, req.body, (err, updatedPatient) => {
    (err) =>
      res
        .status(400)
        .json({ success: false, message: `${req.params.id} not found first` });
    if (updatedPatient == undefined) {
      res
        .status(400)
        .json({ success: false, message: `${req.params.id} not found` });
    } else {
      res.json({
        success: true,
        message: `${req.params.id} has been updated`,
      });
    }
  });
});

router.delete("/id/:id", verifyJWT, (req, res) => {
  Patient.findByIdAndDelete(req.params.id, (err, deletedPatient) => {
    (err) =>
      res.status(400).json({
        success: false,
        message: `${req.params.id} not found`,
      });
    if (deletedPatient == undefined || deletedPatient == null) {
      res.status(400).json({
        success: false,
        message: `${req.params.id} not found`,
      });
    } else {
      res.json({
        success: true,
        message: `${req.params.id} has been deleted`,
      });
    }
  });
});

export default router;
