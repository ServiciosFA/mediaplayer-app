import React from "react";
import "./ProgressCircle.scss";
import { useSelector } from "react-redux";

const Circle = ({ color, percentage, size, strokeWidth }) => {
  const radius = size / 2 - strokeWidth / 2;
  const circ = 2 * Math.PI * radius;
  const strokePct = ((100 - Math.round(percentage)) * circ) / 100;

  const circleStyle = {
    transition: "stroke-dashoffset 0.5s ease-in-out",
    strokeDasharray: circ,
    strokeDashoffset: percentage ? strokePct : 0,
    transform: "rotate(-90deg)", // Ajustar la posición del círculo
    transformOrigin: "center", // Ajustar el origen de la transformación
  };

  return (
    <circle
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      style={circleStyle}
    ></circle>
  );
};

const ProgressCircle = () => {
  const timer = useSelector((state) => state.timer);
  const image = useSelector((state) => state.currentTrack?.imgUrl);
  return (
    <div className="progressiveCircleContainer">
      <svg width={"350px"} height={"350px"}>
        <Circle
          color={"rgb(253, 133, 90)"}
          size={280}
          percentage={timer?.trackPercentage}
          strokeWidth={3}
        ></Circle>

        <defs>
          <clipPath id="myCircle">
            <circle cx="50%" cy="50%" r={300 / 2 - 30} fill="#FFFFFF" />
          </clipPath>
          <clipPath id="myInnerCircle">
            <circle cx="50%" cy="50%" r={300 / 2 - 100} fill="#FFFFFF" />
          </clipPath>
        </defs>
        <image
          className={timer.isRunning ? "imageActive" : ""}
          x={45}
          y={45}
          width={260}
          height={260}
          href="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
          clipPath="url(#myCircle)"
        />
        <image
          className={timer?.isRunning ? "imageActive" : ""}
          x={125}
          y={125}
          width={100}
          height={100}
          href={image}
          clipPath="url(#myInnerCircle)"
        />
      </svg>
    </div>
  );
};

export default ProgressCircle;
