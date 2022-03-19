import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import TestComp from "./App";

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <BrowserRouter>
      <TestComp />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
