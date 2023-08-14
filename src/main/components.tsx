import { useState } from "react";
import { TeamsTableWrapper } from "./teams/TeamsTable";
import { Page } from "./models";
export function TeamsPage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="tbar">
        <button id="removeSelected">✖ Remove selected</button>
        <div className="tfill"></div>
        <input
          type="search"
          id="searchTeams"
          placeholder="Search..."
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
        <label htmlFor="searchTeams">🔎</label>
      </div>
      <TeamsTableWrapper search={search} />
    </>
  );
}

export function HomePage() {
  return <div>Home..</div>;
}
export function TodosPage() {
  return <div>Todos..</div>;
}
type Props = {
  activePage: Page;
};

export function ContentWrapper(props: Props) {
  /* cazuri care se pot folosi
  {activePage === "home" ? <HomePage /> : null}
  {activePage === "todos" && <TodosPage />}
  */
  //const activePage: Page = "teams" as Page;
  const page = getActivePage(props.activePage);
  return <div id="main">{page}</div>;
}

function getActivePage(activePage: Page) {
  switch (activePage) {
    case "home":
      return <HomePage />;
    case "todos":
      return <TodosPage />;
    case "teams":
      return <TeamsPage />;
    default:
      return <HomePage />;
  }
}
