import React, { useState } from "react";
import apiClient, { loginEndpoint } from "../../spotify";
import logo from "../../assets/spotifyIcon.jpg";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../../store/tokenSlice";
import { currentUserActions } from "../../store/currentUserSlice";
import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import DownloadIcon from "@mui/icons-material/Download";
import { notificationActions } from "../../store/notificationSlice";

const Login = () => {
  const token = useSelector((state) => state.token);
  const log = useSelector((state) => state.token);
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(0);

  useEffect(() => {
    const userData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("me");
        if (response.status === 403) {
          throw new Error(
            "This account doesn't have permission on this page, please follow the login instructions. "
          );
        } else dispatch(currentUserActions.SET_USER(response.data));
        const responsePlaylist = await apiClient.get("me/playlists");
        if (responsePlaylist.status === 403)
          throw new Error(
            "This account doesn't have permission on this page, please follow the login instructions. "
          );
        setPlaylist(responsePlaylist.data.total);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        dispatch(
          tokenActions.SET_TOKEN({
            accessToken: null,
            tokenType: null,
            expiresIn: null,
            expiresTime: null,
          })
        );
        dispatch(
          notificationActions.ACTIVE_NOTIFICATION({
            message: error.response.data || "An error occurred.",
            type: "error",
          })
        );
      }
    };

    if (log?.accessToken) userData();
    else {
      dispatch(currentUserActions.RESET());
    }
  }, [log, dispatch]);

  //Elimina token de store cuando desloguea usuario
  const logout = () => {
    dispatch(
      tokenActions.SET_TOKEN({
        accessToken: null,
        tokenType: null,
        expiresIn: null,
        expiresTime: null,
      })
    );
    dispatch(currentUserActions.RESET());
  };

  const userName =
    user?.displayName.charAt(0).toUpperCase() + user.displayName.slice(1);
  const followers = user?.followers;

  if (loading) {
    return <Spinner type="big"></Spinner>;
  }

  const handlerDatauser = () => {
    const customData = "User:testexampleapp@hotmail.com\nPass:Exampletestapp";
    const blob = new Blob([customData], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DataUser.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="loginContainer">
      {!token.accessToken && (
        <div className="userIntroductiion">
          <p className="userGuide">
            This web application only works with a specific user configured in
            the Spotify API. Please download this data.
          </p>
          <button className="userDatadownloadbutton" onClick={handlerDatauser}>
            Account
            <DownloadIcon
              className="downloadIcon"
              fontSize="small"
            ></DownloadIcon>
          </button>
        </div>
      )}
      <div className="perfilContainer">
        <img
          src={user?.id && user?.images[1]?.url ? user.images[1].url : logo}
          alt=""
          className="logo"
        ></img>
        <div className="userPerfil">
          <p className="usernameText">{userName}</p>
          {followers ? (
            <p className="userItemDescription">{`${followers} Followers `}</p>
          ) : (
            ""
          )}
          {followers ? (
            <p className="userItemDescription">{`${playlist} Public playlists`}</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="buttonContainer">
        {!token?.accessToken ? (
          //Redirige url a la definida en spotify.js para loguear usr
          <a href={loginEndpoint}>
            <div className="loginButton">Login </div>
          </a>
        ) : (
          <button className="loginButton" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
