import React, { useEffect } from "react";

const Account = () => {
	useEffect(() => {
		document.title = "React Clinic | Account";
	}, []);

	return (
		<div>
			<h2>Account</h2>
		</div>
	);
};

export default Account;
