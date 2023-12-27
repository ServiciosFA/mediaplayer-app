import React, { useMemo, useState } from "react";
import "./Favorite.scss";
import time from "../../functions/Time";
import { currentTrackActions } from "../../store/currentTrackSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDataRequest from "../../hook/useDataRequest";
import SearchBar from "../../ui/SearchBar";
import FavoriteItems from "./FavoriteItems";
import { searcherList } from "../../functions/searcherUtils";
import Spinner from "../../ui/Spinner";

const Favorite = () => {
  const [searcher, setSearcher] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Peticion Api Lista de favoritos
  const { data: favTracks, loading, error } = useDataRequest("me/tracks");

  //Lista filtrada en variable para evitar problemas de vinculacion de estados
  const searcherListFavourites = useMemo(() => {
    return searcherList(loading, favTracks, searcher);
  }, [favTracks, searcher, loading]);

  //Render de lista de favoritos con memo para ahorrar calculos costosos
  const renderFavList = useMemo(() => {
    const favPlayhandler = (item, index) => {
      dispatch(currentTrackActions.SET_LIST_TRACK({ tracks: favTracks.items }));

      dispatch(
        currentTrackActions.SET_CURRENT_TRACK({
          ...item.track,
          indexTrack: index,
        })
      );
      navigate("/player", { state: { favTracks } });
    };
    return searcherListFavourites?.map((item, index) => {
      const itemTime = time(item.track.duration_ms);
      if (itemTime.segundos < 10) itemTime.segundos = "0" + itemTime.segundos;
      return (
        <FavoriteItems
          itemTime={itemTime}
          key={index + item.track.id}
          itemKey={index + item.track.id}
          index={index}
          item={item}
          onFav={favPlayhandler}
        ></FavoriteItems>
      );
    });
  }, [dispatch, favTracks, navigate, searcherListFavourites]);

  //Update searcher
  const setSearchers = (event) => {
    setSearcher(event);
  };

  return (
    <div className="favoriteContainer">
      <SearchBar
        onsetSearcher={setSearchers}
        placeHolder={"Buscar en lista"}
      ></SearchBar>
      {loading ? (
        <Spinner type="big"></Spinner>
      ) : (
        <ul className="favList">{renderFavList}</ul>
      )}
    </div>
  );
};

export default Favorite;
