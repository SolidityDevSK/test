
import { TransactionContext } from "@/context/TransactionProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Skeleton from "../../Skeleton/Skeleton";


const Logo = () => {

  const { animationEnd } = useContext(TransactionContext)
  return (
    <div className="flex items-center justify-center w-[150px]">
      {animationEnd ? 
      (   <Link href="/">   
      <Image
        className="md:w-full"
        src="/logo-dark.svg"
        alt="Logo"
        width={100}
        height={100}
      />
   
  </Link>) :(
      <div className="flex h-fit my-auto">
      <Skeleton width={130} height={10} />
    </div>
  )}
   
    </div>
  );
};

export default Logo;
