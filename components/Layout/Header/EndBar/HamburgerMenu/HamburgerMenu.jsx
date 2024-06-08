import React from "react";
import { Spiral as Hamburger } from "hamburger-react";

const HamburgerMenu = ({ funct, status }) => {
  const setOpen = () => funct(!status);

  return (
    <div className="z-50 flex md:hidden text-white">
      <Hamburger toggled={status} toggle={setOpen} />
    </div>
  );
};

export default HamburgerMenu;
