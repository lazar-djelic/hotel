import { fetchHotelConfig } from "../api/hotel-config/useConfig";

const Test = () => {
  const { conf } = fetchHotelConfig();
  console.log("Test conf:", conf);
  return <div>Test</div>;
};

export default Test;
