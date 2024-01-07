import React, { useCallback, useEffect } from "react";
import "./Card.scss";
import CancelIcon from "@mui/icons-material/Cancel";

const Card = ({ children, onClose, type }) => {
  const styleCard = `cardContainer ${type}`;
  const onKeyPressed = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener("keydown", onKeyPressed);
    return () => {
      document.removeEventListener("keydown", onKeyPressed);
    };
  }, [onKeyPressed]);
  return (
    <div className={styleCard} tabIndex={0} onKeyDown={onKeyPressed}>
      <CancelIcon className="headCard" onClick={() => onClose()}></CancelIcon>
      {children}
    </div>
  );
};

export default Card;
