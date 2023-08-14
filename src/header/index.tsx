import { PackageId } from "typescript";
import logo from "../images/network-team-icon.png";
import { Page } from "../main/models";
import { MainMenu } from "../menu/MainMenu";
import "./style.css";

type Props = {
  activePage: Page;
};
type Actions = {
  setActive(active: Page): void;
};
export default function AppHeader(props: Props & Actions) {
  return (
    <header>
      <div id="header-wrapper">
        <div id="my-picture">
          <img src={logo} alt="poza" width="100" />
        </div>
        <div id="header-info">
          <h1>Teams Networking</h1>
          <h2 id="job-title">
            <span className="app-icon">{getIcon(props.activePage)}</span> CRUD operations (CREATE, READ, UPDATE, DELETE)
          </h2>
        </div>
      </div>
      <MainMenu activePage={props.activePage} setActive={props.setActive} />
    </header>
  );
}

const icons: { [key in Page]: string } = {
  home: "🏠",
  todos: "📋",
  teams: "👨‍👨‍👦"
};
function getIcon(page) {
  return icons[page];
}
