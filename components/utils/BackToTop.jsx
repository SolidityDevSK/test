import React, { useState, useEffect } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { Button } from "../ui/button";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = window.scrollY; // Use window.scrollY to get the scroll position
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Add the scroll event listener when the component mounts
    window.addEventListener("scroll", toggleVisible);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div>
      {visible && (
        <div className="fixed hidden md:flex right-0 bottom-0 my-20 mx-5 z-10">
          <Button variant="default" onClick={scrollToTop}>
            <div className="text-4xl">
              <RiArrowRightSLine className="-rotate-90" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default BackToTop;
