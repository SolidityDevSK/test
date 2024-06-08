import React from "react";
import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[999] h-screen flex flex-col items-center justify-center bg-[#010F16]">
      <Image
        src="/loadingIcon.png"
        width={40}
        height={40}
        alt="Loading-Icon"
        className="animate-pulse"
      />
      <p className="text-white animate-pulse text-2xl mt-4 font-bold">
        Loading...
      </p>
    </div>
  );
};

export default LoadingPage;
