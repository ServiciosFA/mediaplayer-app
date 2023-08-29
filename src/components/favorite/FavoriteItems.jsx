import React from "react";
import "./FavoriteItems.scss";

const FavoriteItems = ({ item, i, itemKey, itemTime, onFav }) => {
  return (
    <li key={itemKey} className="favItem" onClick={() => onFav(item, i)}>
      <div className="favName">
        <p className="favNum">{i + 1}</p>
        <img
          src={item.track.album.images[0].url}
          alt=""
          className="favImages"
        ></img>
        <div>
          <p className="favTrack">{item.track.name} -</p>
          <p className="favArtist">{item.track.artists[0].name}</p>
        </div>
      </div>

      <p>{itemTime.minutos + ":" + itemTime.segundos}</p>
    </li>
  );
};

export default FavoriteItems;
