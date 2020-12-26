import React, { useEffect } from "react";

const Report = () => {
  useEffect(() => {
    document.title = "React Clinic | Report";
  }, []);

  return (
    <div>
      <h2>Report</h2>
    </div>
  );
};

export default Report;
