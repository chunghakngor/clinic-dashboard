import React from "react";

const index = () => {
	return (
		<div>
			<div>
				<h3>Login</h3>
				<form onSubmit={(e) => e.preventDefault()}>
					<input type="text" name="username" />
					<input type="password" name="password" />
					<button type="submit">Login</button>
					<button type="reset">Clear</button>
				</form>
			</div>
		</div>
	);
};

export default index;
