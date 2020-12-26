import React, { useEffect } from "react";

const Analytics = () => {
	useEffect(() => {
		document.title = "React Clinic | Analytics";
	}, []);

	return (
		<div>
			<h2>Analytics</h2>
		</div>
	);
};

export default Analytics;
