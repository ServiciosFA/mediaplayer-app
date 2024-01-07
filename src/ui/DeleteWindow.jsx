import React from "react";
import Card from "./Card";
import Button from "./Button";
import "./DeleteWindow.scss";

const DeleteWindow = ({ setShowDelete, item, onDelete, title, typeItem }) => {
  //
  console.log(item);
  return (
    <Card onClose={() => setShowDelete(false)}>
      <h3 className="titleModal">{title}</h3>
      <p className="descriptionModal">
        {`The ${typeItem} `}
        <span className="playlistName">{` "${item.name}" `}</span>
        <span>{" will be deleted"}</span>
      </p>
      <div className="buttonPanelmodal">
        <Button onClick={() => setShowDelete()}>Cancelar</Button>
        <Button onClick={() => onDelete(item.id)} styles="focus">
          Eliminar
        </Button>
      </div>
    </Card>
  );
};

export default DeleteWindow;
