import React, { useContext } from "react";
import HeroLeftTitle from "./HeroLeftTitle/HeroLeftTitle";
import SearchDomain from "./SearchDomain/SearchDomain";
import HeroLeftFooter from "./HeroLeftFooter/HeroLeftFooter";

import Style from "./Leftbar.module.css";
import { TransactionContext } from "@/context/TransactionProvider";
import Skeleton from "@/components/Layout/Skeleton/Skeleton";

const HeroLeft = () => {
  const { animationEnd } = useContext(TransactionContext)
  return (
    <div>{animationEnd ? (
      <div className="relative">
        <span className={Style.topLight}></span>
        <HeroLeftTitle />
        <SearchDomain />
        <HeroLeftFooter />
      </div>)
      : (
   <div>
      <Skeleton width={320} height={120}/>
      <Skeleton width={320} height={50}/>
      <Skeleton width={320} height={30}/>
       
     
   </div>
      )}
    </div>

  );
};

export default HeroLeft;
