import Image from "next/image";
import React from "react";

const index = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#010F16]">
      <Image
        src="/loadingIcon.png"
        width={40}
        height={40}
        alt="Loading-Icon"
      />
      <p className="text-[#ffffff7b] animate-pulse text-2xl mt-4 font-bold">
        Page is not found!
      </p>
    </div>
  );
};

export default index;
