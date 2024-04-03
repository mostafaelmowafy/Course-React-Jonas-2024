import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
// import StarRating from "./StarRating";
import AppV3 from "./App-v-3";

function Star() {
  const [movieRate, setMoviRate] = useState(0);

  return (
    <>
      <AppV3
        color="red"
        onSetRating={setMoviRate}
        starSize={15}
        maxRating={10}
        messages={[
          "Very poor",
          "Very poor",
          "Poor",
          "Poor",
          "Good",
          "Good",
          "Very good",
          "Very good",
          "Excellent",
          "Excellent",
        ]}
      />
      <p>This Movie is rated: {movieRate}</p>
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <StarRating
      maxRating={5}
      messages={["Very poor", "Poor", "Good", "Very good", "Excellent"]}
    /> */}
    <Star />
  </React.StrictMode>
);
