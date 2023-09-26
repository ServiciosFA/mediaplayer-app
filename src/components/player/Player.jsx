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

const Player = () => {
  const location = useLocation();
  const currentTrack = useSelector((state) => state.currentTrack);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Peticion de tracks de un playList determinada
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        if (location?.state?.id) {
          const data = await apiClient.get(
            "playlists/" + location.state?.id + "/tracks"
          );
          dispatch(
            currentTrackActions.SET_CURRENT_TRACK({
              ...data.data.items[0].track,
              tracks: data.data.items,
              indexTrack: 0,
            })
          );
          if (!data) throw new Error("Bad request");
          setError(null);
          setLoading(false);
        } else {
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchTracks();
  }, [location.state, dispatch]);

  //Setear tiempo para interfaz
  useEffect(() => {
    dispatch(
      timerSliceActions.SET_TIMER({
        timer: { seconds: 0, minutes: 0 },
        //Pasar a segundos la duracion
        totalTime: currentTrack.duration / 1000,
        trackPercentage: 0,
      })
    );
  }, [currentTrack.duration, dispatch, currentTrack?.name]);

  return (
    <>
      {!location.state && !currentTrack.name ? (
        <Navigate to="/library"></Navigate>
      ) : loading && !currentTrack ? (
        <div>Loading</div>
      ) : (
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
      )}
    </>
  );
};

export default Player;
