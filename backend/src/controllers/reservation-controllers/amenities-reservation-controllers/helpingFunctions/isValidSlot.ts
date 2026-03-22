export function isValidSlot(
  startTime: Date,
  endTime: Date,
  slotDuration: number,
) {
  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

  return duration === slotDuration;
}
