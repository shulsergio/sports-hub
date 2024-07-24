export function onHtmlMarkupTableCreated(table) {
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
