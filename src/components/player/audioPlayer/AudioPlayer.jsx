import React from "react";
import ButtonsPanel from "./ButtonsPanel";
import ProgressCircle from "./ProgressCircle";
import "./AudioPlayer.scss";

const AudioPlayer = () => {
  return (
    <div className="player">
      <ProgressCircle></ProgressCircle>
      <ButtonsPanel></ButtonsPanel>
    </div>
  );
};

export default AudioPlayer;
