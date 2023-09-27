import React from "react";
import "./BarProgress.scss";

const BarProgress = ({ onPercentage, percentage, duracion, time }) => {
  const minutes = duracion ? Math.floor(duracion / 60) : 0;
  const seconds = duracion ? Math.floor(duracion % 60) : 0;

  const renderTimer = () => {
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let minutes = Math.floor(time / 60);

    if (minutes < 10) minutes = "0" + minutes;

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
