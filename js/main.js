import {
  onGetListMatchesbyPASTDay,
  onGetListMatchesbyTODAY,
  onGetMatchByID,
  onGetTableAllChampionatByID,
} from "./functions.js";
import { onHtmlMarkupTableCreated } from "./marckup.js";

const LS_KEY_CHAMPS_ID = "all-champs";
const HtmltableList = document.querySelector(".table-list");

let matchArray = [];
let onlineChamps = [];

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

async function globalTableCreate(id, season_number) {
  const table = await onGetTableAllChampionatByID(id, season_number);
  const tableMarkup = onHtmlMarkupTableCreated(table);
  HtmltableList.insertAdjacentHTML("afterend", tableMarkup);
}
// globalTableCreate("1a8afb27a4db853c", "3");

// onGetListMatchesbyTODAY("today");
// onGetListMatchesbyPASTDay("prevday");
// onGetMatchByID("96297dc482aa49d1");
