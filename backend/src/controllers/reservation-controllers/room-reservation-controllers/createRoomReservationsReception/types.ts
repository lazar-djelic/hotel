import { z } from "zod";
import type { Request } from "express";

export const CreateRoomReservationReceptionRequestSchema = {
  body: z.object({
    fName: z.string(),
    lName: z.string(),
    phone: z.number(),
    email: z.string(),
    address: z.string(),
    personalID: z.number(),
    birthDate: z.coerce.date(),
    notes: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    roomType: z.string(),
    bedNum: z.string(),
  }),
  query: z.object({}),
  params: z.object({}),
};

export type CreateRoomReservationReceptionRequest = Request<
  z.infer<typeof CreateRoomReservationReceptionRequestSchema.params>,
  {},
  z.infer<typeof CreateRoomReservationReceptionRequestSchema.body>,
  z.infer<typeof CreateRoomReservationReceptionRequestSchema.query>
>;
