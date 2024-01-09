import React, { useEffect, useMemo, useState } from "react";
import "./Favorite.scss";

import SearchBar from "../../ui/SearchBar";
import { searcherList } from "../../functions/searcherUtils";
import Spinner from "../../ui/Spinner";
import { fetchTooglelikes } from "../../functions/tracksUtils";
import apiClient from "../../spotify";

import RowList from "../../ui/RowList";

const Favorite = () => {
  const [searcher, setSearcher] = useState("");
  const [favTracks, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //Peticion Api Lista de favoritos
  useEffect(() => {
    const dataRequest = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("me/tracks");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    dataRequest();
  }, []);

  //Lista filtrada en variable para evitar problemas de vinculacion de estados
  const searcherListFavourites = useMemo(() => {
    return searcherList(loading, favTracks, searcher);
  }, [favTracks, searcher, loading]);

  //Eliminar de lista de favoritos y mostrar la lista nuevamente
  const handlerLikeToggle = async (setLike, like, id) => {
    await fetchTooglelikes(setLike, like, id);
    try {
      const response = await apiClient.get("me/tracks");
      setData(response.data);
    } catch (error) {}
  };

  //Update searcher
  const setSearchers = (event) => {
    setSearcher(event);
  };
  // lisTracks, searcherList, handleLikeToggle

  return (
    <div className="favoriteContainer">
      <SearchBar
        onsetSearcher={setSearchers}
        placeHolder={"Buscar en lista"}
      ></SearchBar>
      {loading ? (
        <Spinner type="big"></Spinner>
      ) : (
        <RowList
          listTracks={favTracks}
          searcherList={searcherListFavourites}
          handlerLikeToggle={handlerLikeToggle}
        ></RowList>
      )}
    </div>
  );
};

export default Favorite;
