import React from "react";
import "./PlaylistItem.scss";
import { Tooltip as ReactTooltip } from "react-tooltip";

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
          : "playListItem ItemActive"
      }
      key={itemKey + index}
      onClick={() => onSelectHandler(showTrack, index)}
      ref={index === currentTrack.indexTrack ? activeTrackRef : null}
    >
      <ReactTooltip
        id="itemPlaylist"
        effect="solid"
        place="bottom"
        type="info"
        globalEventOff="hover"
        delayShow={1000}
        delayHide={0}
        className="etiqueta"
      />
      <div className="itemPlaylistContainer">
        <p className="indexlistItem">{index + 1}</p>
        <p
          className="namelistItem"
          data-tip
          data-tooltip-id="itemPlaylist"
          data-tooltip-content={showTrack?.name}
        >
          {showTrack?.name}
        </p>
      </div>

      <p className="timelistItem">{minutos + ":" + segundos}</p>
    </li>
  );
};

export default PlaylistItem;
