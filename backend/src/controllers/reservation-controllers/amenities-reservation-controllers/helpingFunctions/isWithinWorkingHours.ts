export function isWithinWorkingHours(
  date: Date,
  startTime: Date,
  endTime: Date,
  openTime: string,
  closeTime: string,
): boolean {
  const [openH = 0, openM = 0] = openTime.split(":").map(Number);
  const [closeH = 0, closeM = 0] = closeTime.split(":").map(Number);

  const openDate = new Date(date);
  openDate.setUTCHours(openH, openM, 0, 0);

  const closeDate = new Date(date);
  closeDate.setUTCHours(closeH, closeM, 0, 0);

  return startTime >= openDate && endTime <= closeDate;
}
