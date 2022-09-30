import React from "react";
import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </>
  );
};

export default App;
