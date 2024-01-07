import React, { useEffect, useState } from "react";
import "./LibraryItem.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import PanelButtons from "./PanelButtons";
import DeleteWindow from "../../ui/DeleteWindow";
import LibraryEdit from "./LibraryEdit";
import apiClient from "../../spotify";

const LibraryItem = ({
  playlist,
  onPlaylistHandler,
  itemKey,
  onEdit,
  user,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const deleteHandler = async (playlistId) => {
    try {
      /* const response = await apiClient.delete(`playlists/${playlistId}`);
      console.log(response);

      if (response.status === 200) {
        setShowDelete(false);*/
      onEdit();
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <li key={itemKey} className="listItem">
      <div
        className="descriptionfavContainer"
        onClick={() => {
          navigate(`${playlist.id}`, {
            state: {
              id: playlist.id,
              name: playlist.name,
              description: playlist.description,
            },
          });
        }}
      >
        <img
          className="imagesFavorite"
          src={playlist?.images[0]?.url}
          alt=""
        ></img>
        <div className="descriptionFavorite">
          <h4>{playlist.name}</h4>
          <p className="tracks">Songs {playlist.tracks.total}</p>
        </div>
      </div>
      <PanelButtons
        playlist={playlist}
        onDelete={() => setShowDelete(true)}
        onPlay={onPlaylistHandler}
        onEdit={() => setShowEdit(true)}
      ></PanelButtons>
      {showDelete && (
        <Modal>
          <DeleteWindow
            setShowDelete={setShowDelete}
            item={playlist}
            onDelete={deleteHandler}
            title={"Do you want to delete this element from the library?"}
            typeItem={"Playlist"}
          ></DeleteWindow>
        </Modal>
      )}
      {showEdit && (
        <Modal>
          <LibraryEdit
            setShowEdit={setShowEdit}
            playlist={playlist}
            onEdit={onEdit}
          ></LibraryEdit>
        </Modal>
      )}
    </li>
  );
};

export default LibraryItem;
