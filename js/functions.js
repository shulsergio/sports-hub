const onboardChamionats = [
  "2713cd487a76d83a",
  "f12fb762acaae78b",
  "52df5453a0628c0a",
  "d621ea12d91a8473",
  "7343482548e0674b",
  "7e9030a95668ba66",
  "f8fd56a0150c50eb",
  "772ae410aef669fe",
  "1a8afb27a4db853c",
  "eb57e70ef2e7077e",
  "b87044bbfccd5436",
  "d463240b9b236077",
  "88fae57d60cc4c4c",
  "133772a82c0ceead",
  "3f2c3ee6eba0dd06",
  "c2221f9a93e2e589",
  "a31003636ed241a6",
  "ded6711698a1ee0f",
  "f0644ed72e7c6a5c",
  "a0d28d6b99d45e79",
  "c83eefc39f2126bd", //,бразилия
  "629922a461b62755", // olimpiada
];
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "cfe2e3971emsh813c1ab54cf7224p1260dajsndf5fa8512b87",
    "X-RapidAPI-Host": "soccer-football-info.p.rapidapi.com",
  },
};
async function onGetJsonData(fetchData) {
  const response = await fetch(fetchData, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

function getFormatDay(getDay) {
  let day = 0;
  const year = String(new Date().getFullYear());
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  if (getDay === "today") {
    day = String(new Date().getDate()).padStart(2, "0");
  } else if (getDay === "prevday") {
    day = String(new Date().getDate() - 1).padStart(2, "0");
  } else if (getDay === "futureday") {
    day = String(new Date().getDate() + 1).padStart(2, "0");
  }
  return `${year}${month}${day}`;
}

export async function onGetTableAllChampionatByID(id, season_number) {
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

export async function onGetListMatchesbyPASTDay(day) {
  const date = getFormatDay(day);
  let globalData = [];
  console.log("date=", date);
  try {
    const data = await onGetJsonData(
      `https://soccer-football-info.p.rapidapi.com/matches/day/basic/?d=${date}`
    );
    console.log("data");
    console.log(data);
    const pageData = data.result
      .map((item) => ({
        champNewID: Number(item.championship.id.replace(/\D/g, "")),
        champID: item.championship.id,
        champ: item.championship.name,
        MatchID: item.id,
        matchStatus: item.status,
        teamA: item.teamA.name,
        teamB: item.teamB.name,
        scoreTeamA: item.teamA.score.f,
        scoreTeamB: item.teamB.score.f,
      }))
      .filter((item) => onboardChamionats.includes(item.champID)); // чемпионат
    globalData = globalData.concat(pageData);
  } catch (err) {
    console.error(err);
  }
  console.log("globalData");
  console.log(globalData);
}

export async function onGetListMatchesbyTODAY(day) {
  const date = getFormatDay(day);
  let globalData = [];
  let totalItem = 0;
  console.log("onGetListMatchesbyTODAY, date=", date);
  for (let i = 1; i < 10; i++) {
    totalItem = totalItem + 25;
    try {
      const data = await onGetJsonData(
        `https://soccer-football-info.p.rapidapi.com/matches/day/basic/?p=${i}&d=${date}` //p=${i}&
      );

      const pageData = data.result
        .map((item) => ({
          champNewID: Number(item.championship.id.replace(/\D/g, "")),
          champID: item.championship.id,
          champ: item.championship.name,
          MatchID: item.id,
          matchStatus: item.status,
          teamA: item.teamA.name,
          teamB: item.teamB.name,
          scoreTeamA: item.teamA.score.f,
          scoreTeamB: item.teamB.score.f,
        }))
        .toSorted((a, b) => b.champNewID - a.champNewID)
        .filter((item) => onboardChamionats.includes(item.champID));
      console.log("data.result.pagination[0].items");
      console.log(data.pagination[0].items);
      globalData = globalData.concat(pageData);
      if (totalItem >= data.pagination[0].items) {
        break;
      }
    } catch (err) {
      console.error(err);
    }
  }
  console.log("globalData");
  console.log(globalData);
}

export async function onGetMatchByID(ID) {
  try {
    const data = await onGetJsonData(
      `https://soccer-football-info.p.rapidapi.com/matches/view/basic/?i=${ID}` //p=${i}&
    );

    console.log("message= ", data);
  } catch (err) {
    console.error(err);
  }
}
