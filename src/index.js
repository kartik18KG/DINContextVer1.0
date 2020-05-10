import React from "react";
import ReactDOM from "react-dom";
// import Preloader from "./Preloader/Preloader";
import AuthContextProvider from "./contexts/authContext";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
