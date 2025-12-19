import { Route, Routes } from "react-router";
import ReservationsPage from "./pages/reservations-page/ReservationsPage.tsx";
import ReviewsPage from "./pages/reviews-page/ReviewsPage.tsx";
import CreateReviewPage from "./pages/create-review-page/CreateReviewPage.tsx";
import ReviewDetailPage from "./pages/review-detail-page/ReviewDetailPage.tsx";
import HomePage from "./pages/home-page/HomePage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/createreview" element={<CreateReviewPage />} />
        <Route path="/review/:id" element={<ReviewDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
