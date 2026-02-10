import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { CreateRoomRequestSchema } from "../controllers/room-controllers/createRoom/types.ts";
import { createRoom } from "../controllers/room-controllers/createRoom/createRoom.ts";
import { GetRoomRequestSchema } from "../controllers/room-controllers/getRoom/types.ts";
import { getRoomById } from "../controllers/room-controllers/getRoom/getRoomById.ts";
import { UpdateRoomRequestSchema } from "../controllers/room-controllers/updateRoom/types.ts";
import { updateRoom } from "../controllers/room-controllers/updateRoom/updateRoom.ts";
import { DeleteRoomRequestSchema } from "../controllers/room-controllers/deleteRoom/types.ts";
import { deleteRoom } from "../controllers/room-controllers/deleteRoom/deleteRoom.ts";
import { GetRoomsRequestSchema } from "../controllers/room-controllers/getRooms/types.ts";
import { getAllRooms } from "../controllers/room-controllers/getRooms/getAllRooms.ts";

const router = express.Router();

router.route("/").get(validateRequest(GetRoomsRequestSchema), getAllRooms);
router.route("/:id").get(validateRequest(GetRoomRequestSchema), getRoomById);
router.route("/").post(validateRequest(CreateRoomRequestSchema), createRoom);
router.route("/:id").put(validateRequest(UpdateRoomRequestSchema), updateRoom);
router
  .route("/:id")
  .delete(validateRequest(DeleteRoomRequestSchema), deleteRoom);

export default router;
