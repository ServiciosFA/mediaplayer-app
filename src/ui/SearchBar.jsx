import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.scss";

const SearchBar = ({ onsetSearcher, placeHolder }) => {
  return (
    <div className="formContainer">
      <label htmlFor="searcher" className="labelSearcher">
        <SearchIcon />
      </label>
      <input
        className="textSearcher"
        type="text"
        id="searcher"
        placeholder={placeHolder}
        onChange={(e) => onsetSearcher(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBar;
