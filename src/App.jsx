/** @format */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouters from "../src/routers/AppRouters";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouters />
      </BrowserRouter>
    </>
  );
};

export default App;
