import { Amenity } from "../../../../models/Amenity.ts";
import { AmenityReservation } from "../../../../models/AmenityReservation.ts";
import { AM_RES_STATUS } from "../../../../utils/enums.ts";
import { isValidSlot } from "./isValidSlot.ts";
import { isWithinWorkingHours } from "./isWithinWorkingHours.ts";

export async function validateAmenityBooking({
  amenityId,
  startTime,
  endTime,
  numberOfPeople,
}: {
  amenityId: string;
  startTime: Date;
  endTime: Date;
  numberOfPeople: number;
}): Promise<boolean> {
  const amenity = await Amenity.findById(amenityId);
  if (!amenity) return false;

  const isValidTime = isWithinWorkingHours(
    startTime,
    startTime,
    endTime,
    amenity.openTime,
    amenity.closeTime,
  );
  if (!isValidTime) return false;

  if (!isValidSlot(startTime, endTime, amenity.slotDuration)) {
    return false;
  }

  const reservations = await AmenityReservation.find({
    amenity: amenityId,
    status: AM_RES_STATUS.booked,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });

  const usedCapacity = reservations.reduce(
    (sum, r) => sum + r.numberOfPeople,
    0,
  );

  if (usedCapacity + numberOfPeople > amenity.capacity) {
    return false;
  }

  return true;
}
