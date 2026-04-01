import { Route, Routes } from "react-router";
import ReviewsPage from "./pages/reviews/reviews-page/ReviewsPage.tsx";
import CreateReviewPage from "./pages/reviews/create-review-page/CreateReviewPage.tsx";
import ReviewDetailPage from "./pages/reviews/review-detail-page/ReviewDetailPage.tsx";
import HomePage from "./pages/home-page/HomePage.tsx";
import RoomPage from "./pages/rooms/create-room-page/RoomPage.tsx";
import RoomsPage from "./pages/rooms/rooms-page/RoomsPage.tsx";
import LoginPage from "./pages/user-pages/login-page/LoginPage.tsx";
import RegisterPage from "./pages/user-pages/register-page/RegisterPage.tsx";
import Profile from "./pages/profile-page/ProfilePage.tsx";
import ProtectedRoute from "./context/ProtectedRoute.tsx";
import { USER_ROLE } from "./config/enums.ts";
import CreateAmenityResRecPage from "./pages/reservations/amenities-reservations-page/reception/create-page/CreateAmenityResRecPage.tsx";
import AmenitiesReservationsPage from "./pages/reservations/amenities-reservations-page/reception/all-reservations/AmenitiesReservationsPage.tsx";
import AmenityReservationEditPage from "./pages/reservations/amenities-reservations-page/reception/edit-reservation-page/AmenityReservationEditPage.tsx";
import CreateAmenityResGuestPage from "./pages/reservations/amenities-reservations-page/guest/CreateAmenityResGuestPage.tsx";
import RoomsReservationsPage from "./pages/reservations/rooms-reservations-page/reception/all-reservations/RoomsReservationsPage.tsx";
import CreateRoomResRecPage from "./pages/reservations/rooms-reservations-page/reception/create-page/CreateRoomResRecPage.tsx";
import RoomReservationEditPage from "./pages/reservations/rooms-reservations-page/reception/edit-reservations-page/RoomReservationEditPage.tsx";
import CreateRoomResGuestPage from "./pages/reservations/rooms-reservations-page/guest/CreateRoomResGuestPage.tsx";
import CheckInPage from "./pages/check-in/CheckInPage.tsx";
import CheckOutPage from "./pages/check-out/CheckOutPage.tsx";
import AllAmenities from "./pages/amenities/all-amenities/AllAmenities.tsx";
import AmenityPage from "./pages/amenities/edit-amenity/AmenityPage.tsx";
import UsersPage from "./pages/user-pages/users-page/UsersPage.tsx";
import { ROUTES } from "./config/routes.ts";
import HousekeepingPage from "./pages/housekeeping/HousekeepingPage.tsx";
import AddExtraPage from "./pages/housekeeping/AddExtraPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={ROUTES.ALL.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.ALL.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.ALL.REVIEWS} element={<ReviewsPage />} />

        <Route
          element={
            <ProtectedRoute allowedRoles={[USER_ROLE.admin, USER_ROLE.guest]} />
          }
        ></Route>

        <Route element={<ProtectedRoute allowedRoles={[USER_ROLE.admin]} />}>
          <Route path={ROUTES.ADMIN.AMENITIES} element={<AllAmenities />} />
          <Route
            path={`${ROUTES.ADMIN.AMENITY}/:id`}
            element={<AmenityPage />}
          />
          <Route path={ROUTES.ADMIN.AMENITY} element={<AmenityPage />} />
          <Route path={ROUTES.ADMIN.USERS} element={<UsersPage />} />
          <Route path={ROUTES.ADMIN.ROOMS} element={<RoomsPage />} />
          <Route path={ROUTES.ADMIN.ROOM} element={<RoomPage />} />
          <Route path={`${ROUTES.ADMIN.ROOM}/:id`} element={<RoomPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[USER_ROLE.receptionist, USER_ROLE.admin]}
            />
          }
        >
          <Route
            path={ROUTES.RECEPTION.AM_RES_S}
            element={<AmenitiesReservationsPage />}
          />
          <Route
            path={ROUTES.RECEPTION.CREATE_AM_RES}
            element={<CreateAmenityResRecPage />}
          />
          <Route
            path={`${ROUTES.RECEPTION.AM_RES}/:id`}
            element={<AmenityReservationEditPage />}
          />
          <Route
            path={ROUTES.RECEPTION.ROOM_RES_S}
            element={<RoomsReservationsPage />}
          />
          <Route
            path={ROUTES.RECEPTION.CREATE_ROOM_RES}
            element={<CreateRoomResRecPage />}
          />
          <Route
            path={`${ROUTES.RECEPTION.ROOM_RES}/:id`}
            element={<RoomReservationEditPage />}
          />
          <Route path={ROUTES.RECEPTION.CHECK_IN} element={<CheckInPage />} />
          <Route path={ROUTES.RECEPTION.CHECK_OUT} element={<CheckOutPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[USER_ROLE.guest]} />}>
          <Route path={ROUTES.GUEST.PROFILE} element={<Profile />} />
          <Route
            path={ROUTES.GUEST.CREATE_REV}
            element={<CreateReviewPage />}
          />
          <Route
            path={`"${ROUTES.GUEST.REVIEW}/:id`}
            element={<ReviewDetailPage />}
          />
          <Route
            path={ROUTES.GUEST.CREATE_AM_RES}
            element={<CreateAmenityResGuestPage />}
          />
          <Route
            path={ROUTES.GUEST.CREATE_ROOM_RES}
            element={<CreateRoomResGuestPage />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={[USER_ROLE.admin, USER_ROLE.staff]} />
          }
        >
          <Route
            path={ROUTES.STAFF.HOUSEKEEPING}
            element={<HousekeepingPage />}
          />
          <Route path={ROUTES.STAFF.ADD_EXTRA} element={<AddExtraPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
