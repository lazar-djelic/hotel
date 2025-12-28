import React, { useEffect } from "react";

const HomePage = () => {
  const [num, setNum] = React.useState(0);
  let test = 0;

  useEffect(() => {
    console.log(Number(new Date()), "useEffect ran");
  }, [num]);

  console.log(Number(new Date()), "rendered with num =", num);

  return (
    <div>
      {num}
      <br />
      <button onClick={() => setNum(num + 1)}>Increase</button>
      <br />
      <button
        onClick={() => {
          test++;
          console.log(Number(new Date()), "test increased to", test);
        }}
      >
        test Increase
      </button>
    </div>
  );
};

export default HomePage;
