const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	commission_rate: Number,
	price_quote: Number,
	first_contact: Date,
	comments: [{ body: String, date: Date }],
	consult_date: Date,
	deposit: Number,
	ht: Date,
	graft: Number,
	follow_up_2w: Date,
	follow_up_3m: Date,
	follow_up_6m: Date,
	follow_up_1y: Date,
	contact_method: [{ method: String, user_id: String, comments: String }],
	created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Patient", patientSchema);
