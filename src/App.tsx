import React from "react";
//import logo from './logo.svg';
import logo from "./images/network-team-icon.png";
import "./style.css";
import { AppFooter } from "./footer/components";
import AppHeader from "./header";
import { ContentWrapper } from "./main/components";
import { Page } from "./main/models";

function App() {
  const activePage: Page = "home";
  return (
    <>
      <AppHeader activePage={activePage} />
      <ContentWrapper activePage={activePage} />
      <AppFooter />
    </>
  );
}
export default App;
