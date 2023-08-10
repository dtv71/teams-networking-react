import React from "react";
import { deleteTeamRequest, loadTeamsRequest, updateTeamRequest } from "./middleware";
import { Team } from "./models";

function getEmptyTeam() {
  return { id: "", promotion: "", members: "", name: "", url: "" };
}

type RowProps = {
  team: Team;
  deleteTeam: (id: string) => void;
};
type RowActions = {
  deleteTeam(id: string): void;
  startEdit(team: Team): void;
};

function TeamRow(props: RowProps & RowActions) {
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
        <button
          type="button"
          className="action-btn edit-btn"
          onClick={() => {
            props.startEdit(props.team);
          }}
        >
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

type EditRowProps = {
  team: Team;
};
type EditRowActions = {
  inputChange(name: keyof Team, value: string): void;
};

function EditTeamRow(props: EditRowProps & EditRowActions) {
  const { id, promotion, members, name, url } = props.team;
  return (
    <tr>
      <td style={{ textAlign: "center" }}>
        <input type="checkbox" name="selected" value={id} />
      </td>
      <td>
        <input
          type="text"
          name="promotion"
          value={promotion}
          placeholder="Enter Promotion"
          required
          onChange={e => {
            props.inputChange("promotion", e.target.value);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          name="members"
          value={members}
          placeholder="Enter Members"
          required
          onChange={e => {
            props.inputChange("members", e.target.value);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter Project name"
          required
          onChange={e => {
            props.inputChange("name", e.target.value);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          name="url"
          value={url}
          placeholder="Enter Url"
          required
          onChange={e => {
            props.inputChange("url", e.target.value);
          }}
        />
      </td>
      <td>
        <button type="submit" className="action-btn">
          💾
        </button>
        <button type="reset" className="action-btn">
          ✖️
        </button>
      </td>
    </tr>
  );
}

type Props = {
  loading: boolean;
  teams: any[];
  team: Team;
};
type Actions = {
  deleteTeam(id: string): void;
  startEdit(team: Team): void;
  inputChange(name: keyof Team, value: string): void;
  save(): void;
  reset(): void;
};
export function TeamsTable(props: Props & Actions) {
  console.warn(props);

  return (
    <form
      id="teamsForm"
      action=""
      method="get"
      className={props.loading === true ? "loading-mask" : ""}
      onSubmit={e => {
        e.preventDefault();
        props.save();
      }}
      onReset={e => {
        e.preventDefault();
        props.reset();
      }}
    >
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
          {props.teams.map(team => {
            if (team.id === props.team.id) {
              return <EditTeamRow key={team.id} team={props.team} inputChange={props.inputChange} />;
            }
            return (
              <TeamRow
                key={team.id}
                team={team}
                deleteTeam={function (id) {
                  props.deleteTeam(id);
                }}
                startEdit={props.startEdit}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>&nbsp;</td>
            <td>
              <input type="text" name="promotion" placeholder="Enter Promotion" required disabled={!!props.team.id} />
            </td>
            <td>
              <input type="text" name="members" placeholder="Enter Members" required disabled={!!props.team.id} />
            </td>
            <td>
              <input type="text" name="name" placeholder="Enter Project name" required disabled={!!props.team.id} />
            </td>
            <td>
              <input type="text" name="url" placeholder="Enter Url" required disabled={!!props.team.id} />
            </td>
            <td>
              <button type="submit" className="action-btn" disabled={!!props.team.id}>
                ➕
              </button>
              <button type="reset" className="action-btn" disabled={!!props.team.id}>
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
  team: Team;
};
export class TeamsTableWrapper extends React.Component<WrapperProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      teams: [],
      team: getEmptyTeam()
    };
  }

  componentDidMount(): void {
    this.loadTeams();
  }
  async loadTeams() {
    const teams = await loadTeamsRequest();
    console.info("loaded", teams);
    this.setState({
      loading: false,
      teams: teams
    });
  }

  render() {
    console.warn("render", this.state.team);
    return (
      <TeamsTable
        loading={this.state.loading}
        teams={this.state.teams}
        team={this.state.team}
        deleteTeam={async id => {
          this.setState({ loading: true });
          const status = await deleteTeamRequest(id);
          console.warn("status", status);
          if (status.success) {
            this.loadTeams();
          }
        }}
        startEdit={team => {
          console.warn("startedit", team);
          this.setState({ team });
        }}
        inputChange={(name, value) => {
          console.info("input change %o", value);
          this.setState(state => {
            const team = { ...state.team };
            team[name] = value;
            return {
              team
            };
          });
        }}
        save={async () => {
          console.warn("save", this.state.team);
          const { success } = await updateTeamRequest(this.state.team);
          if (success) {
            this.setState({ loading: true });
            await this.loadTeams();
            this.setState({ team: getEmptyTeam() });
          }
        }}
        reset={() => this.setState({ team: getEmptyTeam() })}
      />
    );
  }
}
