export const ROUTES = {
  ALL: {
    REGISTER: "/register",
    LOGIN: "/login",
    REVIEWS: "/reviews",
  },
  ADMIN: {
    CONFIG: "/admin/config",
    AMENITIES: "/admin/amenities",
    AMENITY: "/admin/amenity",
    USERS: "/admin/users",
    ROOMS: "/admin/rooms",
    ROOM: "/admin/room",
  },
  RECEPTION: {
    AM_RES_S: "/reception/amenity-reservations",
    CREATE_AM_RES: "/reception/create-amenity-reservation",
    AM_RES: "/reception/amenity-reservation",
    ROOM_RES_S: "/reception/room-reservations",
    CREATE_ROOM_RES: "/reception/create-room-reservation",
    ROOM_RES: "/reception/room-reservation",
    CHECK_IN: "/reception/check-in",
    CHECK_OUT: "/reception/check-out",
    MESSAGES: "/reception/messages",
  },
  GUEST: {
    PROFILE: "/profile",
    CREATE_REV: "/create-review",
    REVIEW: "/review",
    CREATE_AM_RES: "/create-amenity-reservation",
    CREATE_ROOM_RES: "/create-room-reservation",
    MESSAGES: "/messages",
  },
  STAFF: {
    HOUSEKEEPING: "/housekeeping",
    ADD_EXTRA: "/add-extra",
  },
};
