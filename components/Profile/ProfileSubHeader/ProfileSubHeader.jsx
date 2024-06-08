import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "@/context/TransactionProvider";
import numeral from "numeral";
import { useAccount } from "wagmi";

const ProfileSubHeader = () => {
  const userData = { user: null };
  const { privBalance, allOwnNFT } = useContext(TransactionContext);
  const { address } = useAccount()
  const [userWallet, setWallet] = useState("")

  useEffect(() => {
    if (!address) return
    let walletChunk = (address.slice(0, 5) + "..." + address.slice(-3)).toUpperCase()
  setWallet(walletChunk)
}, [address])
return (
  <div className="w-full mt-10">
    <div
      className={`border mb-4 border-transparent flex items-center text-white lg:px-2 px-1 rounded-md cursor-pointer ${userWallet ? "justify-between" : "justify-around"
        } text-sm optionBG lg:w-[115px] w-[100px] md:h-8 h-6 mx-auto`}
    >
     <div className="flex justify-around w-full">
          <Image
            src="/binance.svg"
            alt="binance-icon"
            width={15}
            height={15}
          />
          <p className="md:text-[13px] my-auto text-[8px] font-semibold">
           {userWallet}
          </p>
        </div>
    </div>
    <div className="flex w-[250px] font-bold text-white md:text-sm text-[10px] mx-auto justify-between">
      <div className="text-center optionBG mx-1 lg:w-[130px] w-[70px] lg:h-[60px] h-[35px] flex flex-col justify-around py-2 rounded-md">
        <p>{allOwnNFT?.length ? allOwnNFT.length : 0}</p>
        <p className="lg:text-xs text-[8px] font-thin text-white">
          Domain Items
        </p>
      </div>
      <div className="text-center optionBG mx-1 lg:w-[130px] w-[70px] lg:h-[60px] h-[35px] flex flex-col justify-around py-2 rounded-md">
        <p>{privBalance ? numeral(Number(privBalance) / 10 ** 8).format("0,0.000") : "0"}</p>
        <p className="lg:text-xs text-[8px] font-thin text-white">
          bPRIVA Balance
        </p>
      </div>
    </div>
  </div>
);
};

export default ProfileSubHeader;
