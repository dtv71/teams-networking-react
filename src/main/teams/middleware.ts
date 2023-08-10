import { Team } from "./models";

let loadUrl = "http://localhost:3000/teams-json";

if (window.location.host === "dtv71.github.io") {
  loadUrl = "https://nmatei.github.io/teams-networking/data/teams.json";
}
export function loadTeamsRequest(): Promise<Team[]> {
  return fetch(loadUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(r => r.json());
}

export function deleteTeamRequest(id: string, callback?: (status: any) => void) {
  return fetch(loadUrl + "/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  })
    .then(r => r.json())
    .then(status => {
      if (typeof callback === "function") {
        callback(status);
      }
      return status;
    });
}

export function updateTeamRequest(team) {
  return fetch(loadUrl + "/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  }).then(r => r.json());
}

export function createTeamRequest(team) {
  return fetch(loadUrl + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  }).then(r => r.json());
}
