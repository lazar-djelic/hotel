import { fetchHotelConfig } from "../api/reservation-options/useGetAmenities";

const Test = () => {
  const { conf } = fetchHotelConfig();
  console.log("Test conf:", conf);
  return <div>Test</div>;
};

export default Test;
