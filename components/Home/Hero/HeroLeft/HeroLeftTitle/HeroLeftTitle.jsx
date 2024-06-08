import React from "react";

const HeroLeftTitle = () => {
  return (
    <div className="flex items-center justify-center mt-10 text-white max-md:text-center">
      <div className="md:text-5xl text-3xl">
        <div>
          <span className="font-extralight text-primary animate-pulse">
            Discover{" "}
          </span>
          <span>Unstoppable</span>
        </div>
        <div>
          <span>Domain </span>
          <span className="font-extralight text-primary animate-pulse">
            Of{" "}
          </span>
          <span>Art & NFTs</span>
        </div>
      </div>
    </div>
  );
};

export default HeroLeftTitle;
