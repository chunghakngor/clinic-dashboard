import React, { useEffect } from "react";

const Dashboard = () => {
	useEffect(() => {
		document.title = "React Clinic | Dashboard";
	}, []);

	return (
		<div>
			<h3>Dashboard</h3>
		</div>
	);
};

export default Dashboard;
