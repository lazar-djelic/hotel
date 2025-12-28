import { fetchHotelConfig } from "../api/proba/useProba";

const Test = () => {
  const { conf } = fetchHotelConfig();
  console.log("Test conf:", conf);
  return <div>Test</div>;
};

export default Test;
