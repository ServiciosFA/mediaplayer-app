import React from "react";
import "./PlaylistItem.scss";

const PlaylistItem = ({
  currentTrack,
  showTrack,
  onSelectHandler,
  activeTrackRef,
  index,
  itemKey,
  minutos,
  segundos,
}) => {
  return (
    <li
      className={
        index !== currentTrack.indexTrack
          ? "playListItem"
          : "playListItemActive"
      }
      key={itemKey + index}
      onDoubleClick={() => onSelectHandler(showTrack, index)}
      ref={index === currentTrack.indexTrack ? activeTrackRef : null}
    >
      <div className="itemContainer">
        <p className="index">{index + 1}</p>
        <p>{showTrack?.name}</p>
      </div>

      <p>{minutos + ":" + segundos}</p>
    </li>
  );
};

export default PlaylistItem;
