export function setTime(date: Date, time: string): Date {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const newDate = new Date(date);
  newDate.setUTCHours(hours, minutes, 0, 0);
  return newDate;
}
