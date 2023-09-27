import React, { useMemo, useState } from "react";
import "./Home.scss";
import SearchBar from "../ui/SearchBar";
import useDataRequest from "../hook/useDataRequest";
import HomeItem from "./HomeItem";

const Home = () => {
  const { data: newReleases, loading } = useDataRequest("browse/new-releases");
  const [searcher, setSearcher] = useState("");

  //Lista filtrada en variable para evitar problemas de vinculacion de estados
  const searcherList = useMemo(() => {
    return !loading
      ? newReleases.albums.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searcher.toLowerCase()) ||
            item.artists[0].name.toLowerCase().includes(searcher.toLowerCase())
        )
      : [];
  }, [newReleases, searcher, loading]);

  return (
    <div className="homeContainer">
      <SearchBar placeHolder={"Buscar"} onsetSearcher={setSearcher}></SearchBar>
      {!loading && (
        <ul className="homeList">
          {searcherList.map((item, i) => (
            <HomeItem item={item} key={item.id} itemKey={i}></HomeItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
