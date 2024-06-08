import React, { useContext } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TransactionContext } from "@/context/TransactionProvider";
import Skeleton from "@/components/Layout/Skeleton/Skeleton";

const Connect = () => {
  const { animationEnd } = useContext(TransactionContext)
  return (
    <div className="gap-5">
      {animationEnd ? <ConnectButton /> : (
        <div className="md:w-[250px] w-[80px]">
          <Skeleton width={250} height={10} />
        </div>)}
    </div>
  );
};

export default Connect;
