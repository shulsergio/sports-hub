const LS_KEY_CHAMPS_ID = "all-champs";
const HtmltableList = document.querySelector(".table-list");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "cfe2e3971emsh813c1ab54cf7224p1260dajsndf5fa8512b87",
    "X-RapidAPI-Host": "soccer-football-info.p.rapidapi.com",
  },
};
let matchArray = [];
let onlineChamps = [];
async function onGetJsonData(fetchData) {
  const response = await fetch(fetchData, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// function onGetListChampionatOnline() {
//   onGetJsonData("https://soccer-football-info.p.rapidapi.com/live/basic/")
//     .then((data) => {
//       onlineChamps = new Set(data.result.map((item) => item.championship.name));
//       console.log(onlineChamps);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }
// onGetListChampionatOnline();

async function onGetListAllChampionatByCode(code) {
  try {
    const rowdata = await onGetJsonData(
      `https://soccer-football-info.p.rapidapi.com/championships/list/?p=1&c=${code}&l=en_US`
    );
  } catch (err) {
    console.error(err);
  }
}
// onGetListAllChampionatByCode("EU");

async function onGetTableAllChampionatByID(id, season_number) {
  let table = [];
  try {
    const rowdata = await onGetJsonData(
      `https://soccer-football-info.p.rapidapi.com/championships/view/?i=${id}&l=en_US`
    );
    //   console.log(Array.isArray(rowdata.result[0].seasons[3].groups[0].table));
    let leagueTable = rowdata.result[0].seasons[season_number].groups[0].table;
    console.log(leagueTable);
    leagueTable.forEach((item) => {
      table.push({
        rank: item.position,
        club_name: item.team.name,
        club_id: item.team.id,
        games: item.win + item.draw + item.loss,
        wins: item.win,
        draw: item.draw,
        loses: item.loss,
        points: item.points,
        goals_pl: item.goals_scored,
        goals_min: item.goals_conceded,
      });
    });
  } catch (err) {
    console.error(err);
  }
  return table;
}

function onHtmlMarkupCreated(table) {
  return table
    .map(
      ({
        rank,
        club_name,
        games,
        wins,
        draw,
        loses,
        points,
        goals_pl,
        goals_min,
      }) => {
        return `
            <tr>
    <td>${rank}</td>
    <td>${club_name}</td>
    <td>${games}</td>
    <td>${wins}</td>
    <td>${draw}</td>
    <td>${loses}</td>
    <td>${goals_pl}</td>
    <td>${goals_min}</td>
    <td>${points}</td>
    </tr>`;
      }
    )
    .join("");
}

async function globalTableCreate(id, season_number) {
  const table = await onGetTableAllChampionatByID(id, season_number);
  const tableMarkup = onHtmlMarkupCreated(table);
  HtmltableList.insertAdjacentHTML("afterend", tableMarkup);
}
// globalTableCreate("1a8afb27a4db853c", "3");

async function onGetListMatchesbyDay() {
  let globalData = [];
  //   for (let i = 1; i < 15; i++) {
  try {
    const data = await onGetJsonData(
      `https://soccer-football-info.p.rapidapi.com/matches/day/basic/?d=20240719` //p=${i}&
    );
    const pageData = data.result
      .map((item) => ({
        champID: item.championship.id,
        champ: item.championship.name,
        teamA: item.teamA.name,
        teamB: item.teamB.name,
        scoreTeamA: item.teamA.score.f,
        scoreTeamB: item.teamB.score.f,
      }))
      .filter((item) => item.champID === "1a8afb27a4db853c");
    console.log(data);
    console.log("pageData");
    console.log(pageData);
    //   if (pageData.length>0) {
    globalData = globalData.concat(pageData);
    //   }
  } catch (err) {
    console.error(err);
  }
  console.log("globalData");
  console.log(globalData);
}
onGetListMatchesbyDay();
