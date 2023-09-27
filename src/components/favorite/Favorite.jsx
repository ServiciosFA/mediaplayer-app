import React, { useMemo, useState } from "react";
import "./Favorite.scss";
import time from "../../functions/Time";
import { currentTrackActions } from "../../store/currentTrackSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDataRequest from "../../hook/useDataRequest";
import SearchBar from "../../ui/SearchBar";
import FavoriteItems from "./FavoriteItems";

const Favorite = () => {
  const [searcher, setSearcher] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Peticion Api Lista de favoritos
  const { data: favTracks, loading, error } = useDataRequest("me/tracks");

  //Lista filtrada en variable para evitar problemas de vinculacion de estados
  const searcherList = useMemo(() => {
    return !loading
      ? favTracks.items.filter(
          (item) =>
            item.track.name.toLowerCase().includes(searcher.toLowerCase()) ||
            item.track.album.name
              .toLowerCase()
              .includes(searcher.toLowerCase()) ||
            item.track.artists[0].name
              .toLowerCase()
              .includes(searcher.toLowerCase())
        )
      : [];
  }, [favTracks, searcher, loading]);

  //Render de lista de favoritos con memo para ahorrar calculos costosos
  const favList = useMemo(() => {
    const favPlayhandler = (item, i) => {
      dispatch(currentTrackActions.SET_LIST_TRACK({ tracks: favTracks.items }));

      dispatch(
        currentTrackActions.SET_CURRENT_TRACK({ ...item.track, indexTrack: i })
      );
      navigate("/player", { state: { favTracks } });
    };
    return searcherList?.map((item, i) => {
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
