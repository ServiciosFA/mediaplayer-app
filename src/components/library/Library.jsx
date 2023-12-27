import React, { useMemo, useState } from "react";
import "./Library.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentTrackActions } from "../../store/currentTrackSlice";
import SearchBar from "../../ui/SearchBar";
import LibraryItem from "./LibraryItem";
import useDataRequest from "../../hook/useDataRequest";
import Spinner from "../../ui/Spinner";

const Library = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searcher, setSearcher] = useState("");

  //peticion de las lista del usuario
  const { data: playlists, loading, error } = useDataRequest("me/playlists");

  const filterPlaylists = useMemo(() => {
    return !loading
      ? playlists.items.filter((playlist) =>
          playlist.name.toLowerCase().includes(searcher.toLowerCase())
        )
      : [];
  }, [loading, playlists?.items, searcher]);

  //Selecciona la lista-redirige a player con el id de la lista
  const playListHandler = (listId) => {
    dispatch(currentTrackActions.SET_LIST_TRACK(playlists.items));

    navigate("/player", { state: { id: listId } });
  };

  const setSearchers = (e) => {
    setSearcher(e);
  };

  if (loading) {
    return <Spinner type="big"></Spinner>;
  } else if (error) return <p>{error}</p>;

  //Render
  return (
    <div className="libraryContainer">
      <SearchBar
        onsetSearcher={setSearchers}
        placeHolder={"Buscar en Library"}
      ></SearchBar>
      <ul className="listContainer">
        {filterPlaylists?.map((playlist) => (
          <LibraryItem
            playlist={playlist}
            onPlaylistHandler={playListHandler}
            key={playlist.id}
            itemKey={playlist.id}
          ></LibraryItem>
        ))}
      </ul>
    </div>
  );
};

export default Library;
