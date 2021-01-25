require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = verifyJWT = (req, res, next) => {
	try {
		const verify = jwt.verify(req.cookies.access_token, `${secret}`);
		verify.access ? next() : res.status(401).json({ success: false, message: "Invalid token!" });
	} catch (err) {
		console.log(err);
		res.status(401).json({ success: false, message: "Invalid token!" });
	}
};
