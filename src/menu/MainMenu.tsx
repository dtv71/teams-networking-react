import "./menu.css";
export function MainMenu() {
  const active: string = "teams";
  return (
    <ul id="top-menu-bar">
      <li>
        <a href="#home" className={active === "home" ? "active" : ""}>
          HOME
        </a>
      </li>
      <li>
        <a href="#todos" className={active === "todos" ? "active" : ""}>
          To Do' s
        </a>
      </li>
      <li>
        <a href="#teams" className={active === "teams" ? "active" : ""}>
          Teams
        </a>
      </li>
    </ul>
  );
}
