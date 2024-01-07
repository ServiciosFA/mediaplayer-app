import React, { useMemo, useState } from "react";
import "./Home.scss";
import SearchBar from "../ui/SearchBar";
import useDataRequest from "../hook/useDataRequest";

import LayoutItem from "../ui/LayoutItem";
import Spinner from "../ui/Spinner";

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
      <div className="headerHome">
        <p className="titleHome">New releases in your country</p>
        <SearchBar
          placeHolder={"Buscar"}
          onsetSearcher={setSearcher}
        ></SearchBar>
      </div>
      {loading ? (
        <Spinner type={"big"}></Spinner>
      ) : (
        <ul className="homeList">
          {searcherList.map((item, i) => (
            <LayoutItem item={item} key={item.id}></LayoutItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
