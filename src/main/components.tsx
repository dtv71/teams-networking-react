import { useState } from "react";
import { TeamsTableWrapper } from "./teams/TeamsTable";

export function ContentWrapper() {
  //let search = "";
  //console.log(useState(""));
  const [search, setSearch] = useState("");
  //console.warn("wrapper.render", search);
  return (
    <div id="main">
      <div className="tbar">
        <button id="removeSelected">✖ Remove selected</button>
        <div className="tfill"></div>
        <input
          type="search"
          name="search"
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
    </div>
  );
}
