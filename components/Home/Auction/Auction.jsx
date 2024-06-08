import React, { useContext, useEffect, useState } from "react";
import Slider from "./Slider/Slider";
import { TransactionContext } from "@/context/TransactionProvider";
import _ from "lodash";

import { IoIosArrowDropdown } from "react-icons/io";
import Link from "next/link";
import Skeleton from "@/components/Layout/Skeleton/Skeleton";


const Auction = () => {
  const { randomSaleDomainIds, animationEnd } = useContext(TransactionContext)

  return (
    <div className="bg-[#f3f9fc08] md:mt-40 mt-72 border-t border-primary/10">
      {animationEnd ? (<div className="font-extrabold text-center md:text-2xl text-white text-xl mt-10">
        Live <span className="text-primary">Auctions</span>
      </div>) : (<Skeleton width={130} height={60} />)}
      <Slider onSaleNFTs={randomSaleDomainIds} />
      <div>
        {
          animationEnd ? (
            <Link href="/market" className="flex w-fit mx-auto flex-col group cursor-pointer justify-center">
              <p className="h-[2px] w-10 mx-auto bg-gray-600">{""}</p>
              <p className="text-center mx-auto text-primary px-3 -mb-1 hover:animate-none">one more</p>
              <IoIosArrowDropdown className="mx-auto group-hover:animate-none transition-all duration-1000 animate-bounce text-3xl text-gray-500 my-3" />
            </Link>
          ) : (
            <div className="flex w-fit mx-auto">
              <Skeleton width={320} height={50} />
            </div>
          )
        }
      </div>

    </div>
  );
};

export default Auction;
