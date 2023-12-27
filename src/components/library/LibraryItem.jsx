import React from "react";
import "./LibraryItem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const LibraryItem = ({ playlist, onPlaylistHandler, itemKey }) => {
  const disabledContainerPlay =
    playlist.tracks.total > 0 ? "containerPlay" : "containerPlay zeroSong";
  return (
    <li
      key={itemKey}
      className="listItem"
      onClick={() =>
        playlist.tracks.total > 0 ? onPlaylistHandler(playlist.id) : ""
      }
    >
      <img className="images" src={playlist?.images[0]?.url} alt=""></img>
      <div className="itemDescription">
        <h4>{playlist.name}</h4>
        <p className="tracks">Songs {playlist.tracks.total}</p>
      </div>
      <div className={disabledContainerPlay}>
        <PlayArrowIcon fontSize="large"></PlayArrowIcon>
      </div>
    </li>
  );
};

export default LibraryItem;
