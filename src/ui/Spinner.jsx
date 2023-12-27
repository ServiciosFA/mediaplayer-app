import React from "react";
import "./Spinner.scss";

const Spinner = ({ type }) => {
  return (
    <div className="containerSpinner">
      <div className={`spinner ${type}`}></div>
    </div>
  );
};

export default Spinner;
