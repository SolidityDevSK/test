import React, { useState, useEffect, useContext } from "react";
import { Logo, Menu } from "./index";
import EndBar from "./EndBar/Enbar";
import MobileNav from "../MobileNav/MobileNav";
import { TransactionContext } from "@/context/TransactionProvider";

const Header = () => {
  const [open, setOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const {animationEnd} = useContext(TransactionContext)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isScrolled
          ? "bg-background shadow-2xl shadow-primary/10"
          : ""
      } text-white ${animationEnd ? "h-[100px]" : "h-[10px]"} flex items-center justify-between py-10 sticky top-0 z-[999] md:px-10 px-5 duration-500`}
    >
      <div className="flex">
        <Logo funct={setOpen} />
      </div>
      <div className="flex md:justify-between justify-end">
        <div className="lg:flex hidden">
          <Menu />
        </div>
        <div className="flex">
          <EndBar />
        </div>
        <MobileNav />
      </div>
    </div>
  );
};

export default Header;
