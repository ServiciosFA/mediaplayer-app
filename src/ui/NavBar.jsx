import React from "react";
import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import avatar from "../assets/avatar.jpg";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";

const NavBar = () => {
  const user = useSelector((state) => state.currentUser);

  const active = ({ isActive, isPending }) =>
    isPending ? "" : isActive ? "icon-active icons" : "icons";

  return (
    <div className="menuContainer">
      <NavLink to="/login" className="imgContainer">
        <img
          src={
            user?.id && user?.images[0]?.url && user?.images[0]?.url
              ? user?.images[0].url
              : avatar
          }
          alt="imagen"
          className="imageUsr"
        ></img>
      </NavLink>

      <div className="navContainer">
        <NavLink to="/" className={active}>
          <HomeIcon fontSize="medium"></HomeIcon>
          <p>Home</p>
        </NavLink>
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
        <NavLink to="/library" className={active}>
          <LibraryMusicIcon fontSize="medium"></LibraryMusicIcon>
          <p>Library</p>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
