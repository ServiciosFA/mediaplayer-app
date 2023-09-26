import React, { useEffect, useMemo, useRef } from "react";
import "./Playlist.scss";
import Time from "../../../functions/Time";
import { useDispatch, useSelector } from "react-redux";
import { currentTrackActions } from "../../../store/currentTrackSlice";
import { timerSliceActions } from "../../../store/timerSilce";
import PlaylistItem from "./PlaylistItem";

const Playlist = (props) => {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state) => state.currentTrack);
  const activeTrackRef = useRef(null);

  useEffect(() => {
    // Cuando se selecciona una nueva pista, la desplazamos a su posición en la lista usando la referencia de ese item.
    if (activeTrackRef.current) {
      activeTrackRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTrack.indexTrack]);

  //Lista de la lista de canciones, usamos memo para controlar cuando es necesario renderizar y hacer calculos
  const trackItems = useMemo(() => {
    //funcion que establece la nueva cancion seleccionada y resetea el tiempo
    const selectTrackHandler = (track, i) => {
      dispatch(
        currentTrackActions.SET_CURRENT_TRACK({
          ...track,
          indexTrack: i,
        })
      );
      dispatch(
        timerSliceActions.SET_TIMER({
          timer: { seconds: 0, minutes: 0 },
          totalTime: currentTrack?.duration / 1000,
          trackPercentage: 0,
          isRunning: true,
        })
      );
    };
    return currentTrack.tracks?.map((track, i) => {
      const showTrack = track?.track ? track.track : track;

      let { minutos, segundos } = Time(showTrack?.duration_ms);
      if (segundos < 10) segundos = "0" + segundos;

      return (
        <PlaylistItem
          minutos={minutos}
          segundos={segundos}
          currentTrack={currentTrack}
          showTrack={showTrack}
          onSelectHandler={selectTrackHandler}
          activeTrackRef={activeTrackRef}
          index={i}
          key={showTrack?.id + i}
          itemKey={showTrack?.id + i}
        ></PlaylistItem>
      );
    });
  }, [currentTrack, dispatch]);

  return (
    <div className="playListContainer">
      <ul className="listLayout">{trackItems}</ul>
    </div>
  );
};

export default Playlist;
