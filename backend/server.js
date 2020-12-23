const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// NODEJS SETTINGS
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: true,
		credentials: true,
		method: ["GET", "POST", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization", "Accept"],
	})
);

// MONGODB SETTINGS
mongoose.connect(process.env.MONGODB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// ROUTES
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patients");

app.use(patientRoutes);
app.use(authRoutes);

app.get("/", (req, res) => {
	res.json({
		status: "active",
	});
});

app.get("*", (req, res) => {
	res.send(403);
});

app.listen(4000, process.env.IP, () => {
	console.log("Development Server for Hairsmith Clinic is live!");
	console.log("http://localhost:4000");
});
