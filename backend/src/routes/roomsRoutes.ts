import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import {
  CreateRoomRequestSchema,
  type CreateRoomRequest,
} from "../controllers/room-controllers/createRoom/types.ts";
import { createRoom } from "../controllers/room-controllers/createRoom/createRoom.ts";
import {
  GetRoomRequestSchema,
  type GetRoomRequest,
} from "../controllers/room-controllers/getRoom/types.ts";
import { getRoomById } from "../controllers/room-controllers/getRoom/getRoomById.ts";
import {
  UpdateRoomRequestSchema,
  type UpdateRoomRequest,
} from "../controllers/room-controllers/updateRoom/types.ts";
import { updateRoom } from "../controllers/room-controllers/updateRoom/updateRoom.ts";
import {
  DeleteRoomRequestSchema,
  type DeleteRoomRequest,
} from "../controllers/room-controllers/deleteRoom/types.ts";
import { deleteRoom } from "../controllers/room-controllers/deleteRoom/deleteRoom.ts";
import {
  GetRoomsRequestSchema,
  type GetRoomsRequest,
} from "../controllers/room-controllers/getRooms/types.ts";
import { getAllRooms } from "../controllers/room-controllers/getRooms/getAllRooms.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";

const router = express.Router();

router
  .route("/")
  .get(
    authenAndAuthorize<GetRoomsRequest>([
      USER_ROLE.admin,
      USER_ROLE.receptionist,
      USER_ROLE.staff,
    ]),
    validateRequest(GetRoomsRequestSchema),
    getAllRooms,
  );

router
  .route("/:id")
  .get(
    authenAndAuthorize<GetRoomRequest>([USER_ROLE.admin]),
    validateRequest(GetRoomRequestSchema),
    getRoomById,
  );

router
  .route("/")
  .post(
    authenAndAuthorize<CreateRoomRequest>([USER_ROLE.admin]),
    validateRequest(CreateRoomRequestSchema),
    createRoom,
  );

router
  .route("/:id")
  .put(
    authenAndAuthorize<UpdateRoomRequest>([USER_ROLE.admin]),
    validateRequest(UpdateRoomRequestSchema),
    updateRoom,
  );

router
  .route("/:id")
  .delete(
    authenAndAuthorize<DeleteRoomRequest>([USER_ROLE.admin]),
    validateRequest(DeleteRoomRequestSchema),
    deleteRoom,
  );

export default router;
