import { Route, Routes } from "react-router";
import ReservationsPage from "./pages/ReservationsPage";
import ReviewsPage from "./pages/ReviewsPage";
import CreateReviewPage from "./pages/CreateReviewPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/createreview" element={<CreateReviewPage />} />
        <Route path="/review/:id" element={<ReviewDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;