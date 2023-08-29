import React, { useEffect, useState } from "react";
import "./Volumen.scss";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const Volumen = ({ audioRef }) => {
  const [volumenIcon, setVolumenIcon] = useState(null);
  const [offSound, setOffsound] = useState(false);
  const [volumen, setVolumen] = useState(1);

  useEffect(() => {
    const offSoundHandler = () => {
      setOffsound((offSound) => !offSound);
      audioRef.current.muted = !offSound;
    };
    if (!offSound) {
      volumen > 0.5
        ? setVolumenIcon(
            <VolumeUpIcon onClick={offSoundHandler}></VolumeUpIcon>
          )
        : volumen < 0.5 && volumen > 0
        ? setVolumenIcon(
            <VolumeDownIcon onClick={offSoundHandler}></VolumeDownIcon>
          )
        : setVolumenIcon(
            <VolumeMuteIcon onClick={offSoundHandler}></VolumeMuteIcon>
          );
    } else {
      setVolumenIcon(<VolumeOffIcon onClick={offSoundHandler}></VolumeOffIcon>);
    }
  }, [audioRef, offSound, volumen]);

  return (
    <div className="volumenContainer">
      {volumenIcon}
      <input
        className="volumenInput"
        type="range"
        value={volumen}
        min={0}
        max={1}
        step={0.01}
        onChange={(e) => {
          setVolumen(e.target.value);
          audioRef.current.volume = e.target.value;
        }}
      ></input>
    </div>
  );
};

export default Volumen;
