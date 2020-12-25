require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../routes/middlewear");
const secret = process.env.SECRET;

router.post("/auth", verifyJWT, (req, res) => {
	res.status(200).json({
		success: true,
		message: "Valid Token!",
	});
});

router.post("/auth/login", (req, res) => {
	if (req.body.password == "" || req.body.username == "") {
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
						const token = jwt.sign({ access: true }, `${secret}`);
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

router.post("/auth/register", (req, res) => {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		const userData = {
			username: req.body.username,
			password: hash,
			email: req.body.email,
		};
		User.create(userData, (err, newUser) => {
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
		});
	});
});

module.exports = router;
