import React from "react";
import "./Trending.scss";

import useDataRequest from "../../hook/useDataRequest";
import LayoutItem from "../../ui/LayoutItem";
import Spinner from "../../ui/Spinner";

const Trending = () => {
  //Busqueda de listas recomendadas de spotify
  const { data: trending, loading } = useDataRequest(
    "browse/featured-playlists"
  );
  if (loading) {
    return <Spinner type={"big"}></Spinner>;
  }
  return (
    <div className="trendingContainer">
      <p className="titleTreding">{trending.message}</p>
      <ul className="trendingList">
        {trending.playlists.items.map((item, i) => (
          <LayoutItem key={i + item.id} item={item}></LayoutItem>
        ))}
      </ul>
    </div>
  );
};

export default Trending;
