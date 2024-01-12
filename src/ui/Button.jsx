import React from "react";
import "./Button.scss";

const Button = ({ styles, children, onClick, type }) => {
  const active = `button ${styles}`;
  const handlerClick = () => {
    if (!onClick) return;
    else onClick();
  };
  return (
    <button className={active} type={type} onClick={handlerClick}>
      {children}
    </button>
  );
};

export default Button;
