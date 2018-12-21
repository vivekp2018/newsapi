import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import "./styles/style-desktop.css";
import "./styles/style-mobile.css";
import ErrorCatcher from "./ErrorCatcher";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
//import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <ErrorCatcher>
    <App />
  </ErrorCatcher>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
