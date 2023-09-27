import React from "react";
import "./TrendingItem.scss";
import LayoutItem from "../../ui/LayoutItem";

const TrendingItem = ({ item }) => {
  //Hook establece una playlist nueva como la actual y se dirige a la ruta del reproductor
  return <LayoutItem item={item}></LayoutItem>;
};

export default TrendingItem;
