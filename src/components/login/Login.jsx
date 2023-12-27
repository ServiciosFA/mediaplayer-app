<<<<<<< HEAD
import React from "react";
import apiClient, { loginEndpoint } from "../../spotify";
import logo from "../../assets/spotifyIcon.jpg";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../../store/tokenSlice";
import { currentUserActions } from "../../store/currentUserSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const token = useSelector((state) => state.token);
  const log = useSelector((state) => state.token);
  const user = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = () => {
      try {
        apiClient.get("me").then((response) => {
          dispatch(currentUserActions.SET_USER(response.data));
        });
      } catch (error) {}
    };

    if (log?.accessToken) userData();
    else {
      dispatch(currentUserActions.RESET());
    }
  }, [log, dispatch, navigate]);

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

  return (
    <div className="loginContainer">
      <div className="imgContainer">
        <img
          src={user?.id && user?.images[0]?.url ? user.images[0].url : logo}
          alt=""
          className="logo"
        ></img>
        <p className="usernameText">{user?.displayName}</p>
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
=======
import React from "react";
import apiClient, { loginEndpoint } from "../../spotify";
import logo from "../../assets/spotifyIcon.jpg";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../../store/tokenSlice";
import { currentUserActions } from "../../store/currentUserSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const token = useSelector((state) => state.token);
  const log = useSelector((state) => state.token);
  const user = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = () => {
      try {
        apiClient.get("me").then((response) => {
          dispatch(currentUserActions.SET_USER(response.data));
        });
      } catch (error) {}
    };

    if (log?.accessToken) userData();
    else {
      dispatch(currentUserActions.RESET());
    }
  }, [log, dispatch, navigate]);

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

  return (
    <div className="loginContainer">
      <div className="imgContainer">
        <img
          src={user?.id && user?.images[0]?.url ? user.images[0].url : logo}
          alt=""
          className="logo"
        ></img>
        <p>{user?.displayName}</p>
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
>>>>>>> 805ca04de9f2543c83cf36a9994dc34056352e95
