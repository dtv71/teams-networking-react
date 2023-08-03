import React from "react";
import { deleteTeamRequest, loadTeamsRequest } from "./middleware";

type Team = {
  id: string;
  promotion: string;
  members: string;
  name: string;
  url: string;
};

type RowProps = {
  team: Team;
  deleteTeam: (id: string) => void;
};

function TeamRow(props: RowProps) {
  const { id, promotion, members, name, url } = props.team;
  return (
    <tr>
      <td style={{ textAlign: "center" }}>
        <input type="checkbox" name="selected" value={id} />
      </td>
      <td>{promotion}</td>
      <td>{members}</td>
      <td>{name}</td>
      <td>
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </td>
      <td>
        <button type="button" className="action-btn edit-btn">
          📝
        </button>
        <button
          type="button"
          className="action-btn remove-btn"
          onClick={() => {
            props.deleteTeam(id);
          }}
        >
          🗑
        </button>
      </td>
    </tr>
  );
}

type Props = {
  loading: boolean;
  teams: any[];
  deleteTeam: (id: string) => void;
};

export function TeamsTable(props: Props) {
  console.warn(props);

  return (
    <form id="teamsForm" action="" method="get" className={props.loading === true ? "loading-mask" : ""}>
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
              team={team}
              deleteTeam={function (id) {
                props.deleteTeam(id);
              }}
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
type WrapperProps = {};
type State = {
  loading: boolean;
  teams: Team[];
};
export class TeamsTableWrapper extends React.Component<WrapperProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      teams: []
    };
  }

  componentDidMount(): void {
    this.loadTeams();
  }
  loadTeams() {
    loadTeamsRequest().then(t => {
      console.info("loaded", t);
      this.setState({
        loading: false,
        teams: t
      });
    });
  }

  render() {
    console.info("render");
    return (
      <TeamsTable
        loading={this.state.loading}
        teams={this.state.teams}
        deleteTeam={async id => {
          this.setState({ loading: true });
          const status = await deleteTeamRequest(id);
          console.warn("status", status);
          if (status.success) {
            this.loadTeams();
          }
        }}
      />
    );
  }
}
