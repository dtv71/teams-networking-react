import React from "react";
//import logo from './logo.svg';
import logo from "./images/network-team-icon.png";
import "./style.css";
import { AppFooter } from "./footer/components";
import AppHeader from "./header";
import { ContentWrapper } from "./main/components";

function App() {
  return (
    <>
      <AppHeader />
      <ContentWrapper />
      <AppFooter />
    </>
  );
}
export default App;
