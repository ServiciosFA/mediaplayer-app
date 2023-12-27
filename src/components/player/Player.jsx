import React, { useEffect, useState } from "react";
import "./Player.scss";
import Recommendation from "./recommendations/Recommendation";
import SongDetails from "./songDetails/SongDetails";
import Playlist from "./playList/Playlist";
import { Navigate, useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import { useDispatch, useSelector } from "react-redux";
import { currentTrackActions } from "../../store/currentTrackSlice";
import AudioPlayer from "./audioPlayer/AudioPlayer";
import { timerSliceActions } from "../../store/timerSilce";
import Spinner from "../../ui/Spinner";
import { fetchTracks } from "../../functions/tracksUtils";
import { updateTime } from "../../functions/timerUtils";

const Player = () => {
  const location = useLocation();
  const currentTrack = useSelector((state) => state.currentTrack);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Peticion de tracks de un playList determinada
  useEffect(() => {
    fetchTracks(location, setLoading, setError, dispatch);
  }, [dispatch, location]);

  //Setear tiempo para interfaz
  useEffect(() => {
    updateTime(dispatch, currentTrack.duration);
  }, [currentTrack.duration, dispatch, currentTrack.name]);

  if (!location.state && !currentTrack.name)
    return <Navigate to="/library"></Navigate>;
  if (loading && !currentTrack) {
    return <Spinner type="big"></Spinner>;
  }

  return (
    <div className="playerContainer">
      <div className="leftContainer">
        <AudioPlayer></AudioPlayer>
        <Recommendation track={currentTrack.tracks}></Recommendation>
      </div>
      <div className="rightContainer">
        <SongDetails currentTrack={currentTrack}></SongDetails>
        <Playlist tracks={currentTrack.tracks}></Playlist>
      </div>
    </div>
  );
};

export default Player;
