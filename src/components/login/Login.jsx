import React from "react";
import { loginEndpoint } from "../../spotify";
import logo from "../../assets/spotifyIcon.jpg";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../../store/tokenSlice";

const Login = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

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
  };

  return (
    <div className="loginContainer">
      <img src={logo} alt="" className="logo"></img>
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
  );
};

export default Login;
