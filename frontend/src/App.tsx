import { Route, Routes } from "react-router";
import ReservationsPage from "./pages/reservations-page/ReservationsPage.tsx";
import ReviewsPage from "./pages/reviews-page/ReviewsPage.tsx";
import CreateReviewPage from "./pages/create-review-page/CreateReviewPage.tsx";
import ReviewDetailPage from "./pages/review-detail-page/ReviewDetailPage.tsx";
import HomePage from "./pages/home-page/HomePage.tsx";
import ConfigPage from "./pages/config-page/ConfigPage.tsx";
import RoomPage from "./pages/rooms/create-room-page/RoomPage.tsx";
import RoomsPage from "./pages/rooms/rooms-page/RoomsPage.tsx";
import LoginPage from "./pages/login-page/LoginPage.tsx";
import RegisterPage from "./pages/register-page/RegisterPage.tsx";
import Profile from "./pages/profile-page/ProfilePage.tsx";
import ProtectedRoute from "./context/ProtectedRoute.tsx";
import CreateReservationPage from "./pages/create-reservation-page/CreateReservationPage.tsx";
import { USER_ROLE } from "./config/roleEnums.ts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/createreview" element={<CreateReviewPage />} />
        <Route path="/review/:id" element={<ReviewDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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
            path="/reception/reservations"
            element={<ReservationsPage />}
          />
          <Route
            path="/reception/createreservation"
            element={<CreateReservationPage />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[USER_ROLE.guest]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
