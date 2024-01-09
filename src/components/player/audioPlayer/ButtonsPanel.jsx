import React, { useEffect, useRef, useState } from "react";
import "./ButtonsPanel.scss";
import { useDispatch, useSelector } from "react-redux";
import ButtonsPlayer from "../../../ui/ButtonsPlayer";
import BarProgress from "../../../ui/BarProgress";
import { currentTrackActions } from "../../../store/currentTrackSlice";
import { timerSliceActions } from "../../../store/timerSilce";
import Volumen from "./Volumen";
import {
  updatePercentagexTime,
  updateTimexPercentage,
} from "../../../functions/timerUtils";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ButtonsPanel = () => {
  const currentTrack = useSelector((state) => state.currentTrack);
  const dispatch = useDispatch();
  const [play, setPlay] = useState(true);
  const [percentage, setPercentage] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef?.current && currentTrack?.previewTrack) {
      if (play) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    dispatch(timerSliceActions.PLAY_PAUSE(play));
  }, [play, currentTrack, dispatch, audioRef]);

  const handleTimeUpdate = () => {
    updatePercentagexTime(audioRef, setPercentage, dispatch, percentage);
  };

  //Establecer funciones de los botones del reproductor
  const handlerPlayPause = () => {
    setPlay((play) => !play);
  };
  const handlerNext = () => {
    dispatch(currentTrackActions.NEXT_TRACK(currentTrack));
    setPercentage(0);
  };
  const handlerPrev = () => {
    dispatch(currentTrackActions.PREV_TRACK(currentTrack));
  };
  const handlerRepeat = () => {
    dispatch(currentTrackActions.TOGGLE_REPEAT());
  };

  const handlerShuffle = () => {
    dispatch(currentTrackActions.TOGGLE_SHUFFLE());
  };

  //establece el tiempo al audio segun el porcentaje-actualiza datos en store
  const setPercentages = (value) => {
    updateTimexPercentage(value, setPercentage, audioRef, dispatch, percentage);
  };
  return (
    <div className="buttonsContainer">
      <ReactTooltip
        id="itemPlayer"
        effect="solid"
        place="bottom"
        type="info"
        globalEventOff="hover"
        delayShow={1000}
        delayHide={0}
      />
      <p
        className="album"
        data-tooltip-id="itemPlayer"
        data-tooltip-content={currentTrack.name}
      >
        {currentTrack.name}
      </p>
      <p
        className="track"
        data-tooltip-id="itemPlayer"
        data-tooltip-content={currentTrack.artist}
      >
        {currentTrack.artist}
      </p>
      <audio
        ref={audioRef}
        src={currentTrack?.previewTrack}
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onEnded={handlerNext}
      />
      <ButtonsPlayer
        play={play}
        repeat={currentTrack.repeat}
        shuffle={currentTrack.shuffle}
        onPlayPause={handlerPlayPause}
        onPrev={handlerPrev}
        onNext={handlerNext}
        onRepeat={handlerRepeat}
        onShuffle={handlerShuffle}
      ></ButtonsPlayer>
      {audioRef && (
        <BarProgress
          duracion={!audioRef.current?.duration ? 0 : audioRef.current.duration}
          percentage={percentage}
          onPercentage={setPercentages}
          time={
            !audioRef.current?.currentTime ? 0 : audioRef.current?.currentTime
          }
        ></BarProgress>
      )}
      <Volumen audioRef={audioRef} set></Volumen>
    </div>
  );
};

export default ButtonsPanel;
