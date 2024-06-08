import React, { useContext } from "react";
import profileBg from "@/public/123.jpg";
import Image from "next/image";
import { TransactionContext } from "@/context/TransactionProvider";

const ProfileHeader = () => {

  const { profileImgUrl} = useContext(TransactionContext);
  return (
    <div>
      <div className="relative flex justify-center mx-auto h-[200px]">
        <div className="absolute top-0 left-0 right-0 flex justify-center overflow-hidden mx-auto h-[200px] rounded-md">
          <div className="bg-black opacity-50 absolute top-0 left-0 right-0 flex justify-center overflow-hidden mx-auto h-[200px] rounded-md"></div>
          <Image
            src={profileBg}
            alt="profile"
            width={1000}
            height={1000}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
   
          <Image
            className="absolute lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] rounded-full -bottom-8 object-cover"
            src={ profileImgUrl ? profileImgUrl : `/profile.jpg`}
            alt="profile"
            width={500}
            height={500}
          />
      </div>
    </div>
  );
};

export default ProfileHeader;
