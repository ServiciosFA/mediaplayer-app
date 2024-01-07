import React, { useEffect, useMemo, useState } from "react";
import "./Library.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentTrackActions } from "../../store/currentTrackSlice";
import SearchBar from "../../ui/SearchBar";
import LibraryItem from "./LibraryItem";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import apiClient from "../../spotify";
import { notificationActions } from "../../store/notificationSlice";

const Library = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  const [searcher, setSearcher] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsediting] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`me/playlists`);
        setPlaylists(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchPlaylists();
  }, [isEditing]);

  const filterPlaylists = useMemo(() => {
    return !loading
      ? playlists?.items?.filter((playlist) =>
          playlist?.name?.toLowerCase().includes(searcher.toLowerCase())
        )
      : [];
  }, [loading, playlists?.items, searcher]);

  //Selecciona la lista-redirige a player con el id de la lista
  const playListHandler = (listId) => {
    dispatch(currentTrackActions.SET_LIST_TRACK(playlists.items));
    navigate("/player", { state: { id: listId } });
  };

  const addNewPlaylistHandler = async () => {
    try {
      const response = await apiClient.post(`users/${user.id}/playlists`, {
        name: "New playlist",
        description: "New playlist description",
        public: false,
      });
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: "Playlist added",
          type: "success",
        })
      );
      setIsediting(!isEditing);
    } catch (error) {
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: "The playlist could not be added",
          type: "error",
        })
      );
      console.log(error);
    }
  };

  const editHandler = () => {
    setIsediting(!isEditing);
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
      <div className="panelHeaderLibrary">
        <SearchBar
          onsetSearcher={setSearchers}
          placeHolder={"Buscar en Library"}
        ></SearchBar>
        <Button styles="focus" onClick={addNewPlaylistHandler}>
          New Playlist
        </Button>
      </div>
      <ul className="listContainer">
        {filterPlaylists?.map((playlist) => (
          <LibraryItem
            user={user}
            playlist={playlist}
            onPlaylistHandler={playListHandler}
            key={playlist.id}
            itemKey={playlist.id}
            onEdit={editHandler}
          ></LibraryItem>
        ))}
      </ul>
    </div>
  );
};

export default Library;
