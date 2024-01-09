import React, { useEffect, useState } from "react";
import "./Searcher.scss";
import Modal from "../ui/Modal";
import Card from "../ui/Card";
import SearchBar from "./SearchBar";
import RowItem from "./RowItem";
import apiClient from "../spotify";
import { notificationActions } from "../store/notificationSlice";
import { useDispatch } from "react-redux";
import { currentTrackActions } from "../store/currentTrackSlice";
import { useNavigate } from "react-router-dom";

const Searcher = ({ onClose, item }) => {
  const [searcher, setSearcher] = useState("");
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favPlayhandler = (item, index) => {
    dispatch(currentTrackActions.SET_LIST_TRACK({ tracks: [item] }));

    dispatch(
      currentTrackActions.SET_CURRENT_TRACK({
        ...item,
        indexTrack: index,
      })
    );
    navigate("/player", { state: { tracks: [item] } });
  };

  useEffect(() => {
    const searchItem = async () => {
      if (searcher === "") return;
      try {
        const response = await apiClient.get(
          `search?q=${searcher}&type=album%2Ctrack`
        );
        setItems(response.data.tracks.items);
      } catch (error) {
        console.log(error);
      }
    };
    searchItem();
  }, [searcher]);

  const addHandler = async (trackiD) => {
    try {
      await apiClient.post(`/playlists/${item.id}/tracks`, {
        uris: [`spotify:track:${trackiD}`],
      });
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: "Track added",
          type: "success",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: "The track couldn't be added",
          type: "error",
        })
      );
    }
  };

  return (
    <Modal>
      <Card onClose={onClose} type={"big"}>
        <div className="headerSearchitem">
          <p className="headerTitlesearch">{`Adding tracks to ${item.name}`}</p>
          <SearchBar onsetSearcher={(item) => setSearcher(item)}></SearchBar>
        </div>
        {searcher === "" ? (
          <div className="searchItemsContainer">
            <p className="searchEmpty">
              Enter the song or artist you want to look for.
            </p>
          </div>
        ) : (
          <ul className="searchItemsContainer">
            {items?.map((item, id) => (
              <RowItem
                index={id}
                onPlayrow={favPlayhandler}
                item={item}
                onLikeToggle={null}
                itemTime={item.duration_ms}
                onDelete={null}
                onAdd={addHandler}
                key={item.id}
              ></RowItem>
            ))}
          </ul>
        )}
      </Card>
    </Modal>
  );
};

export default Searcher;
