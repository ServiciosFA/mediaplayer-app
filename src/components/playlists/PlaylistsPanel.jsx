import React, { useEffect, useMemo, useState } from "react";
import "./PlaylistsPanel.scss";
import { NavLink, useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import Spinner from "../../ui/Spinner";
import RowList from "../../ui/RowList";
import SearchBar from "../../ui/SearchBar";
import { fetchTooglelikes } from "../../functions/tracksUtils";
import UndoIcon from "@mui/icons-material/Undo";
import AddIcon from "@mui/icons-material/Add";
import Searcher from "../../ui/Searcher";
import { notificationActions } from "../../store/notificationSlice";
import { useDispatch } from "react-redux";

const PlaylistsPanel = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [showAddtrack, setShowAddtrack] = useState(false);
  const [searcher, setSearcher] = useState("");
  const [isEditing, setIsediting] = useState(false);
  const dispatch = useDispatch();

  const filterPlaylists = useMemo(() => {
    return !loading
      ? tracks?.items?.filter((playlist) =>
          playlist.track?.name?.toLowerCase().includes(searcher.toLowerCase())
        )
      : [];
  }, [loading, tracks, searcher]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        if (location?.state?.id) {
          const response = await apiClient.get(
            "playlists/" + location.state?.id + "/tracks"
          );
          if (response) setTracks(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [location.state?.id, isEditing]);

  //Eliminar de lista de favoritos y mostrar la lista nuevamente
  const handlerLikeToggle = async (setLike, like, id) => {
    await fetchTooglelikes(setLike, like, id);
  };
  // https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks
  const handlerDeteletrack = async (trackId) => {
    try {
      await apiClient.delete(`playlists/${location.state?.id}/tracks`, {
        data: {
          tracks: [
            {
              uri: `spotify:track:${trackId}`,
            },
          ],
        },
      });
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: "Track deleted",
          type: "success",
        })
      );
      // Vuelve a cargar la lista de tracks actualizada
      const response = await apiClient.get(
        `playlists/${location.state?.id}/tracks`
      );

      setTracks(response.data);
    } catch (error) {
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: "The track coludn't be deleted",
          type: "error",
        })
      );
    }
  };

  const setSearchers = (e) => {
    setSearcher(e);
  };
  if (loading) {
    return <Spinner type={"big"}></Spinner>;
  }

  return (
    <div className="libraryItemContainer">
      <p className="titlePlaylist">{location?.state?.name}</p>
      {location?.state?.description.length > 0 && (
        <p className="descriptionText">{location?.state?.description}</p>
      )}
      <SearchBar
        onsetSearcher={setSearchers}
        placeHolder="Search track"
      ></SearchBar>
      <RowList
        listTracks={tracks}
        searcherList={filterPlaylists}
        handlerLikeToggle={handlerLikeToggle}
        handlerDelete={handlerDeteletrack}
      ></RowList>
      <NavLink to=".." relative="path">
        <UndoIcon className="buttonPlaylist back"></UndoIcon>
      </NavLink>
      <AddIcon
        className="buttonPlaylist add"
        onClick={() => setShowAddtrack(true)}
      ></AddIcon>
      {showAddtrack && (
        <Searcher
          onClose={() => {
            setShowAddtrack(false);
            setIsediting(!isEditing);
          }}
          item={location.state}
        ></Searcher>
      )}
    </div>
  );
};

export default PlaylistsPanel;
