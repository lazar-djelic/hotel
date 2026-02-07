import Navbar from "../../components/Navbar";
import { fetchHotelConfig } from "../api/hotel-config/useConfig";
import Test from "./Test";

const HomePage = () => {
  const { conf } = fetchHotelConfig();
  console.log("HomePage conf:", conf);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Test />
    </div>
  );
};

export default HomePage;
