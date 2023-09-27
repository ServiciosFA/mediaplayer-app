import React, { useEffect, useState } from "react";
import "./SongDetails.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import apiClient from "../../../spotify";

const SongDetails = (props) => {
  const currentTrack = useSelector((state) => state.currentTrack);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);

  //API spotify no siempre devuelve los detalles de las tracks cuando los guardo en store
  const hasDetail = currentTrack.releaseDate && currentTrack.artist;

  useEffect(() => {
    try {
      setLoading(true);
      const fetchArtist = async () => {
        const data = await apiClient.get("me/tracks");
        if (data.data.items.find((item) => item.track.id === currentTrack.id))
          setLike(true);
        else setLike(false);
      };

      fetchArtist();
      setLoading(false);
    } catch (error) {}
  }, [currentTrack, like]);

  const onLikeHandler = (e) => {
    try {
      const fetchSaveFavorite = async () => {
        if (!like) {
          const response = await apiClient.put(
            "me/tracks?ids=" + currentTrack.id
          );
          if (response.status === 200 || response.status === 204) setLike(true);
        } else {
          const response = await apiClient.delete(
            "me/tracks?ids=" + currentTrack.id
          );
          if (response.status === 200 || response.status === 204)
            setLike(false);
        }
      };
      fetchSaveFavorite();
    } catch (error) {}
  };

  return (
    <div className="songDetailsContainer">
      <div className="imageContainer">
        <img src={currentTrack?.imgUrl} alt="Imagen Album"></img>
      </div>
      {hasDetail && (
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
            <p>Release Date: </p>
            <p>{currentTrack?.releaseDate}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongDetails;
