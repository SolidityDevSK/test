import React from "react";
import { Connect, Profile } from "./index";

const EndBar = () => {
  return (
    <div className="my-auto flex items-center">
      <Profile />
      <Connect />
    </div>
  );
};

export default EndBar;
