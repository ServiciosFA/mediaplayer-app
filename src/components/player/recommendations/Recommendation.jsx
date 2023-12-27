import React, { useEffect, useState } from "react";
import "./Recommendation.scss";
import { useDispatch, useSelector } from "react-redux";
import { currentTrackActions } from "../../../store/currentTrackSlice";
import { fetchRecommendationsData } from "../../../functions/recommendationUtils";
import Spinner from "../../../ui/Spinner";

import RecommendedItem from "./RecommendedItem";

const Recommendation = () => {
  const tracks = useSelector((state) => state.currentTrack.tracks);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecommendationsData(tracks, setLoading, setError, setRecommendations);
  }, [tracks]);

  const recommendedHandler = (value) => {
    dispatch(
      currentTrackActions.SET_LIST_TRACK({ tracks: value.listRecomend })
    );
    dispatch(
      currentTrackActions.SET_CURRENT_TRACK({
        ...value.listRecomend[0],
        indexTrack: 0,
      })
    );
  };

  if (loading) {
    return <Spinner type="normal"></Spinner>;
  } else if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="recommendationListLayout">
      <h4 className="titleExplore">
        {"Explore More from "}
        <span className="artist">{recommendations.forListen}</span>
      </h4>
      <ul className="recommendations">
        {recommendations?.listAlbums?.slice(0, 9).map((item, i) => (
          <RecommendedItem
            key={item.id}
            index={i}
            recommendation={item}
            recommendedHandler={recommendedHandler}
          ></RecommendedItem>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;
