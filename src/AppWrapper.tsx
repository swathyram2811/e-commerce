import React from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import Header from "./components/Header/header";
import { MyContextProvider } from "./contextProvider/context";

const AppWrapper: React.FC = () => {
  return (
    <BrowserRouter>
      <MyContextProvider>
        <Header />
        <App />
      </MyContextProvider>
    </BrowserRouter>
  );
};

export default AppWrapper;
