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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/createreview" element={<CreateReviewPage />} />
        <Route path="/review/:id" element={<ReviewDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
