import React, { useEffect, useState } from "react";
import apiClient, { loginEndpoint } from "../../spotify";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../../store/tokenSlice";
import { currentUserActions } from "../../store/currentUserSlice";
import Spinner from "../../ui/Spinner";
import DownloadIcon from "@mui/icons-material/Download";
import { notificationActions } from "../../store/notificationSlice";
import "./Login.scss";
import logo from "../../assets/spotifyIcon.jpg";

const Login = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(0);

  // ✅ Nuevo useEffect para extraer el token de la URL
  useEffect(() => {
    const hash = window.location.hash;
    if (!token.accessToken && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      const tokenType = params.get("token_type");
      const expiresIn = params.get("expires_in");

      if (accessToken) {
        // Guardar el token en Redux
        dispatch(
          tokenActions.SET_TOKEN({
            accessToken,
            tokenType,
            expiresIn,
            expiresTime: Date.now() + expiresIn * 1000,
          })
        );

        // Limpiar la URL para evitar problemas de seguridad
        window.history.replaceState(null, null, window.location.pathname);
      }
    }
  }, [dispatch, token.accessToken]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("me");
        dispatch(currentUserActions.SET_USER(response.data));

        const responsePlaylist = await apiClient.get("me/playlists");
        setPlaylist(responsePlaylist.data.total);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        dispatch(tokenActions.SET_TOKEN({ accessToken: null }));
      } finally {
        setLoading(false);
      }
    };

    if (token.accessToken) fetchUserData();
  }, [token.accessToken, dispatch]);

  const logout = () => {
    dispatch(tokenActions.SET_TOKEN({ accessToken: null }));
    dispatch(currentUserActions.RESET());
  };

  return (
    <div className="loginContainer">
      {!token.accessToken && (
        <div className="userIntroductiion">
          <p className="userGuide">
            This web application only works with a specific user configured in
            the Spotify API. Please download this data.
          </p>
          <button className="userDatadownloadbutton">
            Account
            <DownloadIcon className="downloadIcon" fontSize="small" />
          </button>
        </div>
      )}
      <div className="perfilContainer">
        <img src={user?.images?.[1]?.url || logo} alt="Profile" className="logo" />
        <div className="userPerfil">
          <p className="usernameText">{user?.displayName || "Guest"}</p>
          <p className="userItemDescription">{`${user?.followers || 0} Followers`}</p>
          <p className="userItemDescription">{`${playlist} Public playlists`}</p>
        </div>
      </div>
      <div className="buttonContainer">
        {!token?.accessToken ? (
          <a href={loginEndpoint}>
            <div className="loginButton">Login</div>
          </a>
        ) : (
          <button className="loginButton" onClick={logout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Login;
