import React, { useEffect } from "react";
import { fetchConfQueryFn } from "../api/reservation-options/amenitiesQueryFn";

export const HomePage = () => {
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(null);

  console.log("aaaa");

  useEffect(() => {
    console.log("bbb");
    fetchConfQueryFn().then((data) => setData(data));

    setName("Home Page");
    console.log("ccc");
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("ddd");

  return (
    <>
      <button onClick={() => setName("Clicked!")}>Click me</button>
      <div>{name}</div>;
    </>
  );
};
