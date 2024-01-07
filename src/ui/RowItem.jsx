import React, { useEffect, useState } from "react";
import LikeToggle from "./LikeToggle";
import "./RowItem.scss";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { fetchArtist } from "../functions/tracksUtils";
import Spinner from "./Spinner";
import { formatTime } from "../functions/timerUtils";
import AddIcon from "@mui/icons-material/Add";

const RowItem = ({
  index,
  onPlayrow,
  item,
  onLikeToggle,
  itemTime,
  onDelete,
  onAdd,
}) => {
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArtist(setLoading, setLike, item.id);
  }, [item]);

  const onLikeHandler = () => {
    onLikeToggle(setLike, like, item.id);
  };

  return (
    <li className="rowItem">
      <p className="rowNum">{index + 1}</p>
      <div className="rowName" onClick={() => onPlayrow(item, index)}>
        <img src={item.album.images[0].url} alt="" className="rowImages"></img>
        <div className="nametrackLayout">
          <p className="frowTrack">{item.name}</p>
          <span className="rowArtist">{item.artists[0].name}</span>
        </div>
      </div>
      <div className="buttonActionsContainer">
        <div className="rowLike">
          {loading ? (
            <Spinner type="small"></Spinner>
          ) : (
            <LikeToggle
              condition={like}
              onLikeHandler={() => onLikeHandler()}
            ></LikeToggle>
          )}
        </div>
        {onDelete && (
          <PlaylistRemoveIcon
            className="rowDelete"
            onClick={() => {
              onDelete(item.id);
            }}
          ></PlaylistRemoveIcon>
        )}
        {onAdd && (
          <AddIcon className="rowAdd" onClick={() => onAdd(item.id)}></AddIcon>
        )}
      </div>
      <p className="timeTrack">{formatTime(itemTime)}</p>
    </li>
  );
};

export default RowItem;
