import React from "react";
import "./TrendingItem.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import apiClient from "../../spotify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentTrackActions } from "../../store/currentTrackSlice";

const TrendingItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Establecer nueva lista seleccionada por id -establece en storage-Redirige a player
  const trendingListHandler = async (item) => {
    try {
      const response = await apiClient.get("playlists/" + item.id + "/tracks");

      dispatch(
        currentTrackActions.SET_LIST_TRACK({ tracks: response.data.items })
      );

      dispatch(
        currentTrackActions.SET_CURRENT_TRACK({
          ...response.data.items[0].track,
          indexTrack: 0,
        })
      );

      navigate("/player", { state: { playList: response.data.items } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li
      className="itemContainer"
      key={item.id}
      onClick={() => trendingListHandler(item)}
    >
      <img src={item.images[0].url} className="imgItem" alt=""></img>
      <div className="textContainer">
        <p className="nameItem">{item.name}</p>
        <p className="descriptionItem">{item.description}</p>
      </div>
      <div className="modal">
        <PlayCircleIcon className="button"></PlayCircleIcon>
      </div>
    </li>
  );
};

export default TrendingItem;
