import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import { Web3ReactProvider } from "@web3-react/core";
import App from "./App";
import { getLibrary } from "./config/web3";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
