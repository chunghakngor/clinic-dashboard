import React, { useEffect } from "react";

const Search = () => {
	useEffect(() => {
		document.title = "React Clinic | Search";
	}, []);

	return (
		<div>
			<h2>Search</h2>
		</div>
	);
};

export default Search;
