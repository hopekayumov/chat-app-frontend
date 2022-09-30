import React from "react";
import Navbar from "../components/Navbar";
import MailPage from "../components/MailPage";

const Main = () => {
  return (
    <div className="mt-[120px] container px-12 mx-auto">
      <Navbar />
      <MailPage />
    </div>
  );
};

export default Main;
