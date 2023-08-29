import React from "react";
import "./BarProgress.scss";
import { useSelector } from "react-redux";

const BarProgress = ({ onPercentage, percentage, duracion }) => {
  const time = useSelector((state) => state.timer);
  const minutes = duracion ? Math.floor(duracion / 60) : 0;
  const seconds = duracion ? Math.floor(duracion % 60) : 0;

  const renderTimer = () => {
    const seconds =
      time.timer.seconds < 10 ? "0" + time.timer.seconds : time.timer.seconds;
    const minutes =
      time.timer.minutes < 10 ? "0" + time.timer.minutes : time.timer.minutes;
    return <p>{minutes + ":" + seconds}</p>;
  };

  return (
    <div className="barContainer">
      {renderTimer()}
      <div>
        <input
          id="barProgress"
          type="range"
          name="barProgress"
          className="bar"
          min={0}
          max={100}
          step={1}
          value={percentage}
          onChange={(e) => onPercentage(e.currentTarget.value)}
        ></input>
      </div>
      <p>
        {(minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds)}
      </p>
    </div>
  );
};

export default BarProgress;
