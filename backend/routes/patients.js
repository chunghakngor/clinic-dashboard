const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const faker = require("faker");
const verifyJWT = require("./middlewear");

router.get("/patient", verifyJWT, (req, res) => {
	Patient.find({}, (err, foundPatient) => {
		(err) => console.log(err);
		res.status(200).json(foundPatient);
	});
});

router.post("/patient", verifyJWT, (req, res) => {
	const data = {
		firstname: faker.name.firstName(),
		lastname: faker.name.lastName(),
		commission_rate: 3,
		price_quote: faker.commerce.price(),
		first_contact: faker.date.recent(),
		deposit: faker.commerce.price(),
	};
	Patient.create(data, (err, newPatient) => {
		(err) => console.log(err);
		res.json(newPatient);
	});
});

// ID ROUTES

router.get("/patient/id/:id", verifyJWT, (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		(err) => res.json({ success: false, message: `${req.params.id} not found` });
		if (foundPatient == undefined) {
			res.json({ success: false, message: `${req.params.id} not found` });
		} else {
			res.json(foundPatient);
		}
	});
});

router.put("/patient/id/:id", verifyJWT, (req, res) => {
	Patient.findByIdAndUpdate(req.params.id, req.body, (err, updatedPatient) => {
		(err) => res.status(400).json({ success: false, message: `${req.params.id} not found first` });
		if (updatedPatient == undefined) {
			res.status(400).json({ success: false, message: `${req.params.id} not found` });
		} else {
			res.json({
				success: true,
				message: `${req.params.id} has been updated`,
			});
		}
	});
});

router.delete("/patient/id/:id", verifyJWT, (req, res) => {
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

module.exports = router;
