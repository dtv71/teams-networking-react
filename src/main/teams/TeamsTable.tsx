function TeamRow({ id, promotion, members, name, url }) {
  // const displayUrl = url.startsWith("https://github.com/") ? url.substring(19) : url;
  return (
    <tr>
      <td style={{ textAlign: "center" }}>
        <input type="checkbox" name="selected" value="${id}" />
      </td>
      <td>{promotion}</td>
      <td>{members}</td>
      <td>{name}</td>
      <td>
        <a href="${url}" target="_blank">
          {url}
        </a>
      </td>
      <td>
        <button type="button" data-id="${id}" className="action-btn edit-btn">
          📝
        </button>
        <button type="button" data-id="${id}" className="action-btn remove-btn">
          🗑
        </button>
      </td>
    </tr>
  );
}

type Props = {
  loading: boolean;
  teams: any[];
};

export function TeamsTable(props: Props) {
  console.warn(props);

  return (
    <form id="teamsForm" action="" method="get" className={props.loading == true ? "loading-mask" : ""}>
      <table id="teamsTable">
        <colgroup>
          <col className="select-all-column" />
          <col style={{ width: "20%" }} />
          <col style={{ width: "40%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "15%" }} />
          <col className="table-actions" />
        </colgroup>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="selectAll" id="selectAll" />
            </th>
            <th>Promotion</th>
            <th>Members</th>
            <th>Project name</th>
            <th>Project URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.teams.map(team => (
            <TeamRow
              key={team.id}
              id={team.id}
              promotion={team.promotion}
              members={team.members}
              name={team.name}
              url={team.url}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>&nbsp;</td>
            <td>
              <input type="text" name="promotion" placeholder="Enter Promotion" required />
            </td>
            <td>
              <input type="text" name="members" placeholder="Enter Members" required />
            </td>
            <td>
              <input type="text" name="name" placeholder="Enter Project name" required />
            </td>
            <td>
              <input type="text" name="url" placeholder="Enter Url" required />
            </td>
            <td>
              <button type="submit" className="action-btn">
                ➕
              </button>
              <button type="reset" className="action-btn">
                ✖️
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  );
}

export function TeamsTableWrapper() {
  const teams = [
    {
      id: "toze8j1610313009673",
      promotion: "html",
      members: "Nicolae Matei, HTML",
      name: "Web Presentation",
      url: "https://github.com/nmatei/web-intro-presentation"
    },
    {
      id: "ezabnf1630345987541",
      promotion: "css",
      members: "Nicolae",
      name: "Names",
      url: "https://github.com/nmatei/nmatei.github.io"
    },
    {
      id: "86mq81630347385708",
      promotion: "js",
      members: "Matei, Andrei",
      name: "JS/HTML/CSS Quiz",
      url: "https://github.com/nmatei/simple-quiz-app"
    }
  ];
  return (
    <>
      {/* <TeamsTable loading={false} teams={[]} />
      <br />
      <TeamsTable loading={true} teams={[]} />
      <br />
      <TeamsTable loading={true} teams={teams} />
      <br /> */}
      <TeamsTable loading={false} teams={[]} />
    </>
  );
}
