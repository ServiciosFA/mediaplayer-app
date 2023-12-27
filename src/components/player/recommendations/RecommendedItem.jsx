import React from "react";
import "./RecommendedItem.scss";
import useSelectPlayList from "../../../hook/useSelectPlayListHandler";

const RecommendedItem = ({ index, recommendation, recommendedHandler }) => {
  const { playListHandler: albumnsHandler } = useSelectPlayList(recommendation);
  return (
    <li
      key={index}
      className="recommendedItem"
      onClick={() => albumnsHandler(recommendation)}
    >
      <img
        className="imgRecomendeditem"
        src={recommendation?.images[0]?.url}
        alt=""
      ></img>
      <div className="description">
        <p className="song">{recommendation?.name}</p>
        <p className="artists">{recommendation?.artists[0].name}</p>
      </div>
    </li>
  );
};

export default RecommendedItem;
