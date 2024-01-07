import React from "react";
import "./Modal.scss";

const Modal = ({ children, type }) => {
  const styleModal = `modalDelete ${type}`;
  return <div className={styleModal}>{children}</div>;
};

export default Modal;
