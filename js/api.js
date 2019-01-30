let base_url ="https://api.football-data.org/v2/";
const token = '82474fd0bdcc40a4a92bf1a2e5b464fd';
const id_liga = 2002;
var teamData;

let url_standings = `${base_url}competitions/${id_liga}/standings`;
let url_team = `${base_url}competitions/${id_liga}/teams`;
let url_scorer =`${base_url}competitions/${id_liga}/scorers`;

let fetchApi = url => {
  return fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      'X-Auth-Token': token
    }
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getStandings() {
  if ('caches' in window) {
    caches.match(url_standings).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          setDataToListStandings(data);
        });
      }
    });
  }

  fetchApi(url_standings)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      setDataToListStandings(data)   
    })
    .catch(error);
}

function getTeam() {
  if ('caches' in window) {
    caches.match(url_team).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          setDataToListTeam(data);
        });
      }
    });
  }

  fetchApi(url_team)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      setDataToListTeam(data)   
    })
    .catch(error);
}

function getTopScore() {
  if ('caches' in window) {
    caches.match(url_scorer).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          ToTopScrorerHtml(data);
        });
      }
    });
  }

  fetchApi(url_scorer)
    .then(status)
    .then(json)
    .then(function(data) {
      ToTopScrorerHtml(data);
     })
    .catch(error);
}

function ToTopScrorerHtml(data){
    var topScorerTML = '';
      data.scorers.forEach(function(player) {
      topScorerTML += `
               <li class="collection-item">
                <a href="#">  
                      <p>${player.player.name}  <a href="#" class="secondary-content">${player.numberOfGoals}</a> <br>
                        ${player.team.name}
                      </p>  
                </a>
              </li>
          `;
    });

    document.getElementById("topScorer").innerHTML = topScorerTML;
    document.getElementById("header-title").innerHTML = 'Top Scorer';
}

function setDataToListStandings(data){
  var html = '';
  data.standings[0].table.forEach(function(res) {
    html += `
              <td>${res.position}</td>
              <td>
                <p class="hide-on-small-only">
                  <img class="responsive-img" width="20" height="20" src="${ res.team.crestUrl || '/img/no_image.png'}"> ${res.team.name}
                </p>
                <p class="hide-on-med-and-up">
                  <img class="responsive-img" width="20" height="20" src="${ res.team.crestUrl || '/img/no_image.png'}">
                </p>
              </td>
              <td>${res.playedGames}</td>
              <td>${res.won}</td>
              <td>${res.draw}</td>
              <td>${res.lost}</td>
              <td>${res.goalsFor}</td>
              <td>${res.goalsAgainst}</td>
              <td>${res.goalDifference}</td>
              <td><b>${res.points}</b></td>
            </tr>
        `;
  });
  document.getElementById("klassemen").innerHTML = html;
  document.getElementById("header-title").innerHTML = 'Klasemen Liga : Liga Jerman';
}

function setDataToListTeam(data){
  var html = '';
  teamData = data
  data.teams.forEach(function(team) {
    html += `
          <div class="col s12 m6 l6">
            <div class="card">
              <div class="card-content">
                <div class="center"><img width="64" height="64" src="${team.crestUrl || '/img/no_image.png'}"></div>
                <div class="center flow-text">${team.name}</div>
                <div class="center">${team.area.name}</div>
                <div class="center">${team.founded}</div>
              </div>
              <div class="card-action center-align">
                  <a class="waves-effect waves-light btn-small blue" onclick="insertTeamListener(${team.id})"><i class="material-icons left">star</i>Add to Favorite</a>
              </div>
            </div>
          </div>
        `;
  });
  document.getElementById("main-content").innerHTML = html;
  document.getElementById("header-title").innerHTML = 'Informasi Tim';
}
