import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Content from "../Content/Content";
import "./Main.scss";

const Main: React.FC = () => {

  return (
    <>
      <div className="container">
       <Header/>
       <Content/>
      </div>
    </>
  );
};

export default Main;
