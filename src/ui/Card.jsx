import React, { useCallback, useEffect } from "react";
import "./Card.scss";
import CancelIcon from "@mui/icons-material/Cancel";

const Card = ({ children, onClose, type, disabled }) => {
  const styleCard = `cardContainer ${type}`;
  const onKeyPressed = useCallback(
    (event) => {
      if (event.key === "Escape" && !disabled) {
        onClose();
      }
    },
    [disabled, onClose]
  );
  useEffect(() => {
    document.addEventListener("keydown", onKeyPressed);
    return () => {
      document.removeEventListener("keydown", onKeyPressed);
    };
  }, [onKeyPressed]);
  return (
    <div className={styleCard} tabIndex={0} onKeyDown={onKeyPressed}>
      <button
        disabled={disabled}
        className="headCard"
        onClick={() => onClose()}
      >
        <CancelIcon></CancelIcon>
      </button>

      {children}
    </div>
  );
};

export default Card;
