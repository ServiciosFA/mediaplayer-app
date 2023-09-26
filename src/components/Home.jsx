import React from "react";
import "./Home";
import SearchBar from "../ui/SearchBar";
import useDataRequest from "../hook/useDataRequest";
import useSelectPlayList from "../hook/useSelectPlayListHandler";

const Home = () => {
  const { data: newReleases, loading } = useDataRequest("browse/new-releases");
  const { playListHandler } = useSelectPlayList();

  return (
    <div>
      <SearchBar></SearchBar>
      {!loading && (
        <ul>
          {newReleases.albums.items.map((item, i) => (
            <li key={item.id + i} onClick={() => playListHandler(item)}>
              {<p>{item.name}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
