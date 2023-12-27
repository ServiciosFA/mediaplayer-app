import React from "react";
import "./FavoriteItems.scss";

const FavoriteItems = ({ item, index, itemTime, onFav }) => {
  return (
    <li className="favItem" onClick={() => onFav(item, index)}>
      <p className="favNum">{index + 1}</p>
      <div className="favName">
        <img
          src={item.track.album.images[0].url}
          alt=""
          className="favImages"
        ></img>
        <div className="nametrackLayout">
          <p className="favTrack">{item.track.name}</p>
          <span className="favArtist">{item.track.artists[0].name}</span>
        </div>
      </div>

      <p className="timeTrack">{itemTime.minutos + ":" + itemTime.segundos}</p>
    </li>
  );
};

export default FavoriteItems;
