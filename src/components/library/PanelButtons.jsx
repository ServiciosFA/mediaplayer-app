import React from "react";
import "./PanelButtons.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Tooltip as ReactTooltip } from "react-tooltip";
const PanelButtons = ({ playlist, onDelete, onPlay, onEdit }) => {
  const disabledContainerPlay =
    playlist.tracks.total > 0 ? "buttonPanel" : "buttonPanel off";

  return (
    <div className="buttonPanelLibrary">
      <ReactTooltip
        id="buttonPanel"
        effect="solid"
        place="bottom"
        type="info"
        globalEventOff="hover"
        className="etiqueta"
      />
      <RemoveCircleOutlineIcon
        className={disabledContainerPlay}
        fontSize="large"
        onClick={() => onDelete()}
        data-tip
        data-tooltip-id="buttonPanel"
        data-tooltip-content={"Delete"}
      ></RemoveCircleOutlineIcon>
      <PlayArrowIcon
        className={disabledContainerPlay}
        disabled={playlist.tracks.total === 0}
        fontSize="large"
        onClick={() => playlist.tracks.total > 0 && onPlay(playlist.id)}
        data-tip
        data-tooltip-id="buttonPanel"
        data-tooltip-content={"Play"}
      ></PlayArrowIcon>
      <EditNoteIcon
        fontSize="large"
        className={disabledContainerPlay}
        onClick={() => onEdit()}
        data-tip
        data-tooltip-id="buttonPanel"
        data-tooltip-content={"Edit"}
      ></EditNoteIcon>
    </div>
  );
};

export default PanelButtons;
