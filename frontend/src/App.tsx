import { Route, Routes } from "react-router";
import AmenitiesReservationsPage from "./pages/reservations/amenities-reservations-page/AmenitiesReservationsPage.tsx";
import ReviewsPage from "./pages/reviews/reviews-page/ReviewsPage.tsx";
import CreateReviewPage from "./pages/reviews/create-review-page/CreateReviewPage.tsx";
import ReviewDetailPage from "./pages/reviews/review-detail-page/ReviewDetailPage.tsx";
import HomePage from "./pages/home-page/HomePage.tsx";
import ConfigPage from "./pages/config-page/ConfigPage.tsx";
import RoomPage from "./pages/rooms/create-room-page/RoomPage.tsx";
import RoomsPage from "./pages/rooms/rooms-page/RoomsPage.tsx";
import LoginPage from "./pages/user-pages/login-page/LoginPage.tsx";
import RegisterPage from "./pages/user-pages/register-page/RegisterPage.tsx";
import Profile from "./pages/profile-page/ProfilePage.tsx";
import ProtectedRoute from "./context/ProtectedRoute.tsx";
import AmenityReservationEditPage from "./pages/reservations/amenity-reservation-edit-page-reception/AmenityReservationEditPage.tsx";
import { USER_ROLE } from "./config/enums.ts";
import CreateAmenityResRecPage from "./pages/reservations/amenities-reservations-page/amenity-reservation-create-page-reception/CreateAmenityResRecPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />

        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/room/:id" element={<RoomPage />} />

        <Route
          element={
            <ProtectedRoute allowedRoles={[USER_ROLE.admin, USER_ROLE.guest]} />
          }
        ></Route>

        <Route element={<ProtectedRoute allowedRoles={[USER_ROLE.admin]} />}>
          <Route path="/config" element={<ConfigPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[USER_ROLE.receptionist, USER_ROLE.admin]}
            />
          }
        >
          <Route
            path="/reception/amenity-reservations"
            element={<AmenitiesReservationsPage />}
          />
          <Route
            path="/reception/create-amenity-reservation"
            element={<CreateAmenityResRecPage />}
          />
          <Route
            path="/reception/amenity-reservation/:id"
            element={<AmenityReservationEditPage />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[USER_ROLE.guest]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createreview" element={<CreateReviewPage />} />
          <Route path="/review/:id" element={<ReviewDetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
