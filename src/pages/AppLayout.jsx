
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
