import React, { useEffect, useState } from "react";
import "./SongDetails.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { fetchArtist, fetchTooglelikes } from "../../../functions/tracksUtils";

const SongDetails = (props) => {
  const currentTrack = useSelector((state) => state.currentTrack);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);

  //API spotify no siempre devuelve los detalles de las tracks cuando los guardo en store
  const hasDetail = currentTrack.releaseDate && currentTrack.artist;

  useEffect(() => {
    fetchArtist(setLoading, setLike, currentTrack.id);
  }, [currentTrack]);

  const onLikeHandler = (e) => {
    fetchTooglelikes(setLike, like, currentTrack.id);
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
          {!loading && like ? (
            <FavoriteIcon
              onClick={onLikeHandler}
              className="like"
            ></FavoriteIcon>
          ) : (
            <FavoriteBorderOutlinedIcon
              onClick={onLikeHandler}
              className="unLike"
            ></FavoriteBorderOutlinedIcon>
          )}
        </div>
        <div className="descriptionDate">
          <p className="releaseText">Release Date: </p>
          <p>{currentTrack?.releaseDate}</p>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
