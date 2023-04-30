import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./fonts/Dongle-Regular.ttf"
// import "../public/assets/fonts/Dongle-light.ttf"
// import "../public/assets/fonts/Dongle-bold.ttf"
import "./index.css";
import "./styles/scss/index.scss"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

reportWebVitals();
