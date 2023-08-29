import React, { useEffect, useState } from "react";
import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import avatar from "../assets/avatar.jpg";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import apiClient from "../spotify";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [image, setImage] = useState(avatar);
  const log = useSelector((state) => state.token);

  useEffect(() => {
    if (log?.accessToken)
      apiClient.get("me").then((response) => {
        setImage(response.data.images[0].url);
      });
  }, [log]);

  const active = ({ isActive, isPending }) =>
    isPending ? "" : isActive ? "icon-active icons" : "icons";

  return (
    <div className="menuContainer">
      <NavLink to="/login" className="imgContainer">
        <img src={image} alt="imagen"></img>
      </NavLink>

      <div className="navContainer">
        <NavLink to="/trending" className={active}>
          <LocalFireDepartmentIcon fontSize="medium"></LocalFireDepartmentIcon>
          <p>Trending</p>
        </NavLink>
        <NavLink to="/player" className={active}>
          <PlayArrowIcon fontSize="medium"></PlayArrowIcon>
          <p>Player</p>
        </NavLink>
        <NavLink to="/favorites" className={active}>
          <FavoriteIcon fontSize="medium"></FavoriteIcon>
          <p>Favorites</p>
        </NavLink>
        <NavLink to="/" className={active}>
          <LibraryMusicIcon fontSize="medium"></LibraryMusicIcon>
          <p>Library</p>
        </NavLink>
      </div>
      <NavLink to="/settings" className="icons">
        <SettingsSharpIcon fontSize="medium"></SettingsSharpIcon>
        <p>Settings</p>
      </NavLink>
    </div>
  );
};

export default NavBar;
