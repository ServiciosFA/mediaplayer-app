import React from "react";
import "./LikeToggle.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const LikeToggle = ({ children, condition, onLikeHandler }) => {
  return condition ? (
    <FavoriteIcon onClick={onLikeHandler} className="like"></FavoriteIcon>
  ) : (
    <FavoriteBorderOutlinedIcon
      onClick={onLikeHandler}
      className="unLike"
    ></FavoriteBorderOutlinedIcon>
  );
};

export default LikeToggle;
