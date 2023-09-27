import React from "react";
import "./LayoutItem.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import useSelectPlayList from "../../src/hook/useSelectPlayListHandler";

const LayoutItem = ({ item }) => {
  const { playListHandler } = useSelectPlayList();
  return (
    <li
      className="itemContainer"
      key={item.id}
      onClick={() => playListHandler(item)}
    >
      <img src={item.images[0].url} className="imgItem" alt=""></img>
      <div className="textContainer">
        <p className="nameItem">{item.name}</p>
        <p className="descriptionItem">{item.description}</p>
      </div>
      <div className="modal">
        <PlayCircleIcon className="button"></PlayCircleIcon>
      </div>
    </li>
  );
};

export default LayoutItem;
