import React, { useEffect, useMemo, useState } from "react";
import "./Library.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentTrackActions } from "../../store/currentTrackSlice";
import apiClient from "../../spotify";
import SearchBar from "../../ui/SearchBar";
import LibraryItem from "./LibraryItem";

const Library = () => {
  const [playlists, setPlaylist] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searcher, setSearcher] = useState("");

  const filterPlaylists = useMemo(() => {
    return playlists.filter((playlist) =>
      playlist.name.toLowerCase().includes(searcher.toLowerCase())
    );
  }, [playlists, searcher]);

  //peticion de las lista del usuario
  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("me/playlists");

        if (!response) throw new Error("Bad request");
        const data = response.data.items;

        setPlaylist(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  //Selecciona la lista-redirige a player con el id de la lista
  const playListHandler = (listId) => {
    dispatch(currentTrackActions.SET_LIST_TRACK(playlists));
    navigate("/player", { state: { id: listId } });
  };

  const setSearchers = (e) => {
    setSearcher(e);
  };

  //Render
  return (
    <div className="libraryContainer">
      <SearchBar
        onsetSearcher={setSearchers}
        placeHolder={"Buscar en Library"}
      ></SearchBar>
      <ul className="listContainer">
        {loading ? (
          "Loading..."
        ) : error ? (
          <div>{error}</div>
        ) : (
          filterPlaylists?.map((playlist) => (
            <LibraryItem
              playlist={playlist}
              onPlaylistHandler={playListHandler}
              key={playlist.id}
              itemKey={playlist.id}
            ></LibraryItem>
          ))
        )}
      </ul>
    </div>
  );
};

export default Library;
