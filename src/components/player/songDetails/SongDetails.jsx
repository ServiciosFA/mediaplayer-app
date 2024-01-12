import React, { useEffect, useState } from "react";
import "./SongDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtist, fetchTooglelikes } from "../../../functions/tracksUtils";
import LikeToggle from "../../../ui/LikeToggle";
import { notificationActions } from "../../../store/notificationSlice";

const SongDetails = (props) => {
  const currentTrack = useSelector((state) => state.currentTrack);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  //API spotify no siempre devuelve los detalles de las tracks cuando los guardo en store

  useEffect(() => {
    fetchArtist(setLoading, setLike, currentTrack.id, setError);
    if (error)
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: error || "An error occurred.",
          type: "error",
        })
      );
    setError(null);
  }, [currentTrack, dispatch, error, like]);

  const onLikeHandler = (e) => {
    fetchTooglelikes(setLike, like, currentTrack.id, setError);
    if (error)
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: error || "An error occurred.",
          type: "error",
        })
      );
    setError(null);
  };

  return (
    <div className="songDetailsContainer">
      <div className="imageContainer">
        <img
          className="imageAlbum"
          src={currentTrack?.imgUrl}
          alt="Imagen Album"
        ></img>
      </div>
      <div className="descriptionContainer">
        <div className="artistItem">
          <h4 className="marquee">{currentTrack?.artist}</h4>
        </div>
        <LikeToggle
          condition={!loading && like}
          onLikeHandler={onLikeHandler}
        ></LikeToggle>
        <div className="descriptionDate">
          <p className="releaseText">Release Date: </p>
          <p>{currentTrack?.releaseDate}</p>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
