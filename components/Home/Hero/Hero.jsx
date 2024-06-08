import React from "react";
import HeroRight from "./HeroRight/HeroRight";
import HeroLeft from "./HeroLeft/HeroLeft";

const Hero = () => {
  return (
    <div className="mx-10">
      <div className="relative flex flex-col lg:flex-row h-[70vh] items-center">
        <div className="flex mx-auto">
          <HeroLeft />
        </div>
        <div className="mt-10 flex mx-auto">
          <HeroRight />
        </div>
      </div>
    </div>
  );
};

export default Hero;
