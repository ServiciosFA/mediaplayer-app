import React, { useEffect, useState } from "react";
import LikeToggle from "./LikeToggle";
import "./RowItem.scss";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { fetchArtist } from "../functions/tracksUtils";
import Spinner from "./Spinner";
import { formatTime } from "../functions/timerUtils";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip as ReactTooltip } from "react-tooltip";

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

  const renderSpinner = loading ? (
    <Spinner type="small"></Spinner>
  ) : (
    <LikeToggle
      condition={like}
      onLikeHandler={() => onLikeHandler()}
    ></LikeToggle>
  );

  return (
    <li className="rowItem">
      <ReactTooltip
        id="itemRow"
        effect="solid"
        place="bottom"
        type="info"
        globalEventOff="hover"
        delayShow={800}
        delayHide={0}
      />
      <ReactTooltip
        id="itemButton"
        effect="solid"
        place="bottom"
        type="info"
        globalEventOff="hover"
      />
      <p className="rowNum">{index + 1}</p>
      <div className="rowName" onClick={() => onPlayrow(item, index)}>
        <img src={item.album.images[0].url} alt="" className="rowImages"></img>
        <div className="nametrackLayout">
          <p
            className="rowTrack"
            data-tooltip-id="itemRow"
            data-tooltip-content={item.name}
          >
            {item.name}
          </p>
          <span
            className="rowArtist"
            data-tooltip-id="itemRow"
            data-tooltip-content={item.artists[0].name}
          >
            {item.artists[0].name}
          </span>
        </div>
      </div>
      <div className="buttonActionsContainer">
        {onAdd && (
          <AddIcon
            data-tooltip-id="itemButton"
            data-tooltip-content="Add"
            className="rowAdd"
            onClick={() => onAdd(item.id)}
          ></AddIcon>
        )}

        {onDelete && (
          <PlaylistRemoveIcon
            className="rowDelete"
            onClick={() => {
              onDelete(item.id);
            }}
            data-tooltip-id="itemButton"
            data-tooltip-content="Delete"
          ></PlaylistRemoveIcon>
        )}
        <div className="likeContainer">{renderSpinner}</div>
      </div>

      <p className="timeTrack">{formatTime(itemTime)}</p>
    </li>
  );
};

export default RowItem;
