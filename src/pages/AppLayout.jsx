<<<<<<< HEAD
import React from "react";
import NavBar from "../ui/NavBar";
import "./AppLayout.scss";
import { Outlet } from "react-router-dom";
import LocationInfo from "../hook/useToken";
import RefreshToken from "../hook/useRefreshToken";

const AppLayout = () => {
  return (
    <div className="layout">
      {/*Hook useToken*/}
      <LocationInfo></LocationInfo>
      <RefreshToken></RefreshToken>
      <NavBar></NavBar>
      <div className="pagesContainer">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AppLayout;
=======
import React from "react";
import NavBar from "../ui/NavBar";
import "./AppLayout.scss";
import { Outlet } from "react-router-dom";
import LocationInfo from "../hook/useToken";
import RefreshToken from "../hook/useRefreshToken";

const AppLayout = () => {
  return (
    <div className="layout">
      {/*Hook useToken*/}
      <LocationInfo></LocationInfo>
      <RefreshToken></RefreshToken>
      <NavBar></NavBar>
      <div className="pagesContainer">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AppLayout;
>>>>>>> 805ca04de9f2543c83cf36a9994dc34056352e95
