import React from "react";

const index = () => {
	return (
		<div>
			<h3>Register</h3>
			<form onSubmit={(e) => e.preventDefault()}>
				<input type="text" name="username" />
				<input type="password" name="password" />
				<button type="submit">Create Account</button>
				<button type="reset">Clear</button>
			</form>
		</div>
	);
};

export default index;
