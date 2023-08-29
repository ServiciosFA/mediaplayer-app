import React, { useEffect, useMemo, useState } from "react";
import "./Favorite.scss";
import apiClient from "../../spotify";
import time from "../../functions/Time";
import { currentTrackActions } from "../../store/currentTrackSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../ui/SearchBar";
import FavoriteItems from "./FavoriteItems";

const Favorite = () => {
  const [favTracks, setFavtracks] = useState([]);
  const [searcher, setSearcher] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Lista filtrada en variable para evitar problemas de vinculacion de estados
  const searcherList = useMemo(() => {
    return favTracks.filter(
      (item) =>
        item.track.name.toLowerCase().includes(searcher.toLowerCase()) ||
        item.track.album.name.toLowerCase().includes(searcher.toLowerCase()) ||
        item.track.artists[0].name
          .toLowerCase()
          .includes(searcher.toLowerCase())
    );
  }, [favTracks, searcher]);

  //Peticion Api Lista de favoritos
  useEffect(() => {
    const favoriteTracks = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("me/tracks");
        if (response.status === 200 && response.status === 204)
          throw new Error("Bad request");
        setFavtracks(response.data.items);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    favoriteTracks();
  }, [searcher]);

  //Render de lista de favoritos con memo para ahorrar calculos costosos
  const favList = useMemo(() => {
    const favPlayhandler = (item, i) => {
      dispatch(currentTrackActions.SET_LIST_TRACK({ tracks: favTracks }));

      dispatch(
        currentTrackActions.SET_CURRENT_TRACK({ ...item.track, indexTrack: i })
      );
      navigate("/player", { state: { favTracks } });
    };
    return searcherList.map((item, i) => {
      const itemTime = time(item.track.duration_ms);
      if (itemTime.segundos < 10) itemTime.segundos = "0" + itemTime.segundos;
      return (
        <FavoriteItems
          itemTime={itemTime}
          key={i + item.track.id}
          itemKey={i + item.track.id}
          i={i}
          item={item}
          onFav={favPlayhandler}
        ></FavoriteItems>
      );
    });
  }, [dispatch, favTracks, navigate, searcherList]);
  const setSearchers = (e) => {
    setSearcher(e);
  };

  return (
    <div className="favoriteContainer">
      <SearchBar
        onsetSearcher={setSearchers}
        placeHolder={"Buscar en lista"}
      ></SearchBar>
      <ul className="favList">{!loading && favList}</ul>
    </div>
  );
};

export default Favorite;
