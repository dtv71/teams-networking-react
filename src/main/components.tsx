import { useState } from "react";
import { TeamsTableWrapper } from "./teams/TeamsTable";
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
            //search = e.target.value;
            //console.log("search", search);
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
export function ContentWrapper() {
  //let search = "";
  //console.log(useState(""));
  //console.warn("wrapper.render", search);
  return (
    <div id="main">
      <HomePage />
      <TodosPage />
      <TeamsPage />
    </div>
  );
}
