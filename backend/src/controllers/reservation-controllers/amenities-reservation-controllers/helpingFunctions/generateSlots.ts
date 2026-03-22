import { Amenity } from "../../../../models/Amenity.ts";
import { AmenityReservation } from "../../../../models/AmenityReservation.ts";
import { AM_RES_STATUS } from "../../../../utils/enums.ts";
import { setTime } from "./setTime.ts";

interface Slot {
  startTime: Date;
  endTime: Date;
  available: boolean;
  remainingCapacity: number;
}

export async function generateSlots(
  amenityId: string,
  date: Date,
): Promise<Slot[]> {
  const amenity = await Amenity.findById(amenityId);
  if (!amenity) throw new Error("Amenity not found");

  const { openTime, closeTime, slotDuration, capacity } = amenity;

  const startOfDay = setTime(date, openTime);
  const endOfDay = setTime(date, closeTime);

  const reservations = await AmenityReservation.find({
    amenity: amenityId,
    status: AM_RES_STATUS.booked,
    startTime: { $lt: endOfDay },
    endTime: { $gt: startOfDay },
  });

  const slots: Slot[] = [];
  let currentStart = new Date(startOfDay);

  while (currentStart < endOfDay) {
    const currentEnd = new Date(
      currentStart.getTime() + slotDuration * 60 * 1000,
    );

    const overlapping = reservations.filter(
      (r) => r.startTime < currentEnd && r.endTime > currentStart,
    );

    const usedCapacity = overlapping.reduce(
      (sum, r) => sum + r.numberOfPeople,
      0,
    );

    const remainingCapacity = capacity - usedCapacity;

    slots.push({
      startTime: new Date(currentStart),
      endTime: currentEnd,
      available: remainingCapacity > 0,
      remainingCapacity,
    });

    currentStart = currentEnd;
  }

  return slots;
}
