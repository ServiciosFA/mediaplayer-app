import React, { useEffect, useState } from "react";
import "./Trending.scss";
import apiClient from "../../spotify";
import TrendingItem from "./TrendingItem";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  //Busqueda de listas recomendadas de spotify
  useEffect(() => {
    const trendingRequest = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("browse/featured-playlists");
        setTrending(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    trendingRequest();
  }, []);

  return (
    <>
      {!loading && (
        <div className="trendingContainer">
          <p className="titleTreding">{trending.message}</p>
          <ul className="trendingList">
            {trending.playlists.items.map((item, i) => (
              <TrendingItem key={i + item.id} item={item}></TrendingItem>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Trending;
