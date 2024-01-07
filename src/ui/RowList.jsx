import React, { useMemo } from "react";
import "./RowList.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentTrackActions } from "../store/currentTrackSlice";
import RowItem from "./RowItem";

const RowList = ({
  listTracks,
  searcherList,
  handlerLikeToggle,
  handlerDelete,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //El useMemo es para optimizar el rendimiento por el calculo del tiempo al renderizar
  const renderFavList = useMemo(() => {
    const favPlayhandler = (item, index) => {
      dispatch(
        currentTrackActions.SET_LIST_TRACK({ tracks: listTracks.items })
      );

      dispatch(
        currentTrackActions.SET_CURRENT_TRACK({
          ...item,
          indexTrack: index,
        })
      );
      navigate("/player", { state: { listTracks } });
    };
    return searcherList?.map((item, index) => {
      return (
        <RowItem
          itemTime={item.track.duration_ms}
          key={index + item.track.id}
          itemKey={index + item.track.id}
          index={index}
          item={item?.track}
          onPlayrow={favPlayhandler}
          onLikeToggle={handlerLikeToggle}
          onDelete={handlerDelete}
        ></RowItem>
      );
    });
  }, [
    dispatch,
    handlerDelete,
    handlerLikeToggle,
    listTracks,
    navigate,
    searcherList,
  ]);
  return <ul className="rowList">{renderFavList}</ul>;
};

export default RowList;
