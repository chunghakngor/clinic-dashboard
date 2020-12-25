import React, { useEffect } from "react";

const Report = () => {
	useEffect(() => {
		document.title = "React Clinic | Report";
	}, []);

	return (
		<div>
			<h3>Report</h3>
		</div>
	);
};

export default Report;
