export async function changeDateToTime(date: Date) {
  const tmp = new Date(date.toUTCString());

  const startTimeFormatted = new Date(tmp)
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace("24:", "00:");

  return startTimeFormatted;
}
