const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	username: { type: String, required: true },
	password: { type: String, required: true },
	created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
