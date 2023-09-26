import React, { useEffect, useState } from "react";
import "./Recommendation.scss";
import APIKit from "../../../spotify";
import { useDispatch, useSelector } from "react-redux";
import { currentTrackActions } from "../../../store/currentTrackSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Recommendation = () => {
  const tracks = useSelector((state) => state.currentTrack.tracks);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState({
    artist: null,
    track1: null,
    track2: null,
  });
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!tracks || tracks.length === 0 || !loading) {
          return;
        }

        setLoading(true);
        setError(null);

        const randomIndexes = Array.from({ length: 3 }, () =>
          getRandomInt(tracks.length)
        );
        const seedArtists = tracks[randomIndexes[0]]?.track
          ? tracks[randomIndexes[0]]?.track?.artists[0]?.id
          : tracks[randomIndexes[0]]?.artists[0]?.id;

        const seedTracks = tracks[randomIndexes[1]]?.track?.id
          ? [
              tracks[randomIndexes[1]]?.track?.id,
              tracks[randomIndexes[2]]?.track?.id,
            ]
          : [tracks[randomIndexes[1]]?.id, tracks[randomIndexes[2]]?.id];

        const [artistResponse, track1Response, track2Response] =
          await Promise.all([
            APIKit.get("recommendations?seed_artists=" + seedArtists),
            APIKit.get("recommendations?seed_tracks=" + seedTracks[0]),
            APIKit.get("recommendations?seed_tracks=" + seedTracks[1]),
          ]);

        const recommendationsData = {
          artist: {
            type: artistResponse.data?.seeds[0]?.type,
            forListen: tracks[randomIndexes[0]]?.track
              ? tracks[randomIndexes[0]]?.track.artists[0].name
              : tracks[randomIndexes[0]]?.artists[0]?.name,
            listRecomend: artistResponse.data?.tracks,
          },
          track1: {
            type: track1Response.data?.seeds[0]?.type,
            forListen:
              tracks[randomIndexes[1]]?.track?.name ||
              tracks[randomIndexes[1]]?.name,
            listRecomend: track1Response.data?.tracks,
          },
          track2: {
            type: track2Response.data?.seeds[0]?.type,
            forListen:
              tracks[randomIndexes[2]]?.track?.name ||
              tracks[randomIndexes[2]]?.name,
            listRecomend: track2Response.data?.tracks,
          },
        };

        setRecommendations(recommendationsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.message);
      }
    };

    fetchRecommendations();
  }, [tracks, loading]);

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

  return (
    <div className="recommendations">
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        Object.keys(recommendations).map((key, i) => (
          <div className="recommendedList" key={i + key}>
            <div className="recommendTitle">
              <div>
                <p className="forRecommend">Because you like </p>
                <p className="forListen">{recommendations[key]?.forListen}</p>
              </div>
              <div className="containerPlay">
                <PlayArrowIcon
                  onClick={() => recommendedHandler(recommendations[key])}
                ></PlayArrowIcon>
              </div>
            </div>
            <ul>
              {recommendations[key]?.listRecomend?.slice(0, 3).map((e, i) => (
                <li key={i} className="recommendedItem">
                  <img src={e?.album?.images[0]?.url} alt=""></img>
                  <div className="description">
                    <p className="song">{e?.name}</p>
                    <p className="artists">{e.artists[0].name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Recommendation;
