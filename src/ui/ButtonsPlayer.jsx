import React from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOnIcon from "@mui/icons-material/RepeatOn";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import "./ButtonsPlayer.scss";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ButtonsPlayer = (props) => {
  return (
    <div className="buttonsActions">
      <ReactTooltip id="buttonPlayer" />
      {props.shuffle ? (
        <ShuffleOnIcon
          data-tooltip-id="buttonPlayer"
          data-tooltip-content="Shuffle on"
          className="buttonActive"
          fontSize="large"
          onClick={props.onShuffle}
        ></ShuffleOnIcon>
      ) : (
        <ShuffleIcon
          data-tooltip-id="buttonPlayer"
          data-tooltip-content="Shuffle off"
          className="buttonActive"
          fontSize="large"
          onClick={props.onShuffle}
        ></ShuffleIcon>
      )}
      <SkipPreviousIcon
        className="button"
        fontSize="large"
        onClick={props.onPrev}
      ></SkipPreviousIcon>
      {!props.play ? (
        <PlayCircleFilledWhiteIcon
          className="buttonPlay"
          fontSize="large"
          onClick={props.onPlayPause}
        ></PlayCircleFilledWhiteIcon>
      ) : (
        <PauseCircleIcon
          className="buttonPlay"
          fontSize="large"
          onClick={props.onPlayPause}
        ></PauseCircleIcon>
      )}
      <SkipNextIcon
        className="button"
        fontSize="large"
        onClick={props.onNext}
      ></SkipNextIcon>
      {props.repeat ? (
        <RepeatOnIcon
          data-tooltip-id="buttonPlayer"
          data-tooltip-content="Repeat on"
          className="buttonActive"
          fontSize="large"
          onClick={props.onRepeat}
        ></RepeatOnIcon>
      ) : (
        <RepeatIcon
          data-tooltip-id="buttonPlayer"
          data-tooltip-content="Repeat off"
          className="buttonActive"
          fontSize="large"
          onClick={props.onRepeat}
        ></RepeatIcon>
      )}
    </div>
  );
};

export default ButtonsPlayer;
