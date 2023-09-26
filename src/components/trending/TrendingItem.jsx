import React from "react";
import "./TrendingItem.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import useSelectPlayList from "../../hook/useSelectPlayListHandler";

const TrendingItem = ({ item }) => {
  //Hook establece una playlist nueva como la actual y se dirige a la ruta del reproductor
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

export default TrendingItem;
