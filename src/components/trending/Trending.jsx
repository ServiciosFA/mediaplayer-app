import React from "react";
import "./Trending.scss";
import TrendingItem from "./TrendingItem";
import useDataRequest from "../../hook/useDataRequest";

const Trending = () => {
  //Busqueda de listas recomendadas de spotify
  const { data: trending, loading } = useDataRequest(
    "browse/featured-playlists"
  );
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
