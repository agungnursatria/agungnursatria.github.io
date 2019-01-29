var dbPromised = idb.open('mydatabase', 1, upgradeDb => {
  if (!upgradeDb.objectStoreNames.contains("favteam")) {
    upgradeDb.createObjectStore('favteam', {keyPath: 'id'});
  }
});

function insertTeamListener(teamId) {
  var team = teamData.teams.filter(el => el.id == teamId)[0]
  insertTeam(team);
}

function insertTeam(team) {
  dbPromised.then(db => {
    var tx = db.transaction('favteam', 'readwrite');
    var store = tx.objectStore('favteam')
    team.createdAt = new Date().getTime()
    store.put(team)
    return tx.complete;
  }).then(() => {
    M.toast({ html: `${team.name} berhasil disimpan!` })
    console.log('Pertandingan berhasil disimpan');
  }).catch(err => {
    console.error('Pertandingan gagal disimpan', err);
  });
}

function deleteTeam(teamId) {
  dbPromised.then(db => {
    var tx = db.transaction('favteam', 'readwrite');
    var store = tx.objectStore('favteam');
    store.delete(teamId);
    return tx.complete;
  }).then(() => {
    M.toast({ html: 'Team has been deleted!' });
    loadFavTeams();
  }).catch(err => {
    console.error('Error: ', err);
  });
}

var getFavTeams = () => {
  return dbPromised.then(db => {
    var tx = db.transaction('favteam', 'readonly');
    var store = tx.objectStore('favteam');
    return store.getAll();
  })
}

function getFavoriteTeam() {
  var teams = getFavTeams();

  teams.then(data => {
    teamData = data;
    var html = ''
    html += '<div class="row">'
    data.forEach(team => {
      html += `
      <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="center"><img width="64" height="64" src="${team.crestUrl || 'img/empty_badge.svg'}"></div>
            <div class="center flow-text">${team.name}</div>
            <div class="center">${team.area.name}</div>
            <div class="center">${team.founded}</div>
          </div>
          <div class="card-action center-align">
              <a class="waves-effect waves-light btn-small red" onclick="deleteTeamListener(${team.id})"><i class="material-icons left">delete</i>Delete</a>
          </div>
        </div>
      </div>
    `
    })

    if(data.length == 0) html += '<h6 class="center-align">No favorite team found!</6>'

    html += "</div>"
    document.getElementById("header-title").innerHTML = 'Tim Favorit';
    document.getElementById("main-content").innerHTML = html;
  })
}

function deleteTeamListener(teamId) {
  var confirmation = confirm("Delete this team?")
  if (confirmation == true) {
    deleteTeam(teamId);
  }
}

function deleteTeam(teamId) {
  dbPromised.then(db => {
    var tx = db.transaction('favteam', 'readwrite');
    var store = tx.objectStore('favteam');
    store.delete(teamId);
    return tx.complete;
  }).then(() => {
    M.toast({ html: 'Team has been deleted!' });
    getFavoriteTeam();
  }).catch(err => {
    console.error('Error: ', err);
  });
}
