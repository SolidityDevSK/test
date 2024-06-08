import Image from "next/image";
import { BsFillSuitHeartFill } from "react-icons/bs";
import Link from "next/link";
// import { Web3Context } from "@/context/web3/Web3Provider";

import React, { useContext, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { usePrivappContractRead, usePrivappContractWrite } from "@/hooks";
import numeral from "numeral";
import { TransactionContext } from "@/context/TransactionProvider";
import { privappMarketPlaceAddress } from "@/lib";
import _ from "lodash";
import { useAccount, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";


const Card = ({ id }) => {

  id = id.toString();
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0)
  const { data: domainData } = usePrivappContractRead("domain", { args: [id], functionName: "getDomainInformationById", watch: false })
  const { data: priceData } = usePrivappContractRead("market", { args: [id], functionName: "getDomainOfferPrice", watch: false })


  const {allowancedMarketPlaceAmount, allOwnNFT, animationEnd, likesData } = useContext(TransactionContext)

  const { address } = useAccount()

  const {data:buyData, write: buyWrite} = usePrivappContractWrite("market")
  
  const {data:approveData, write: approveWrite } = usePrivappContractWrite("token")
  
  
  const {isLoading:buyLoading, isSuccess:buySuccess,isError:buyError} = useWaitForTransaction({hash:buyData?.hash})
  const {isLoading:approveLoading, isSuccess:approveSuccess,isError:approveError} = useWaitForTransaction({hash:approveData?.hash})


  const buyDomain = () => {
    buyWrite({ functionName: "buyDomain", args: [id] })
  }


  const effectText = () => {
    if (buyLoading) {
      return "Loading..."
    } else if (buySuccess) {
      return "Waiting for buy!"
    } else {
      return "Buy"
    }
  }

  const effectApproveText = () => {
    if (approveLoading) {
      return "Loading..."
    } else if (approveSuccess) {
      return "Waiting for approve!"
    } else {
      return "Buy"
    }
  }

  const handleLike = async (id) => {
    if(like) return
    if (!address) return

    const tokenId = id
    const walletAddress = address
    try {
      setLike(true)
      setLikesCount(likesCount+1)
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenId, walletAddress }),
      });
    
      const data = await response.json();
    } catch (error) {
      setLike(false)
      setLikesCount(likesCount-1)
      console.error("Failed to like the domain:", error);
    }
  };

  useEffect(()=>{
    if(approveSuccess) toast.success("Approve successfully created!")
  },[approveSuccess])

  useEffect(()=>{
    if(buySuccess) toast.success("Purchase completed successfully!")
  },[buySuccess])



  useEffect(()=>{
    if(approveError) toast.warn("Sorry, the approve creation process failed. Please try again later.")
  },[approveError])

  useEffect(()=>{
    if(buyError) toast.warn("Sorry, the purchase process failed. Please try again later.")
  },[buyError])


  useEffect(() => {
    let findedData = _.find(likesData, { tokenId: id })
    if(!findedData) return 
    setLikesCount(findedData.likes)
    if (address) {
     let isLiked = _.some(findedData.userHasLiked, data => data === address);
      setLike(isLiked)
    }

  }, [likesData])

  const approveToken = () => {
    approveWrite({ functionName: "approve", args: [privappMarketPlaceAddress, priceData] })
  }

  return (
    <>
      {animationEnd ? (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exist={{
            opacity: 0,
          }}
          transition={{
            delay: 0.25,
          }}
          className="overflow-hidden rounded-lg m-10 bg-background shadow-2xl shadow-primary/10 text-white hover:-translate-y-1 transition-transform cursor-pointer"
        >
 
            <Image
              src={`https://gateway.pinata.cloud/ipfs/${domainData?.ipfsHash}`}
              alt="card-image"
              width={1250}
              height={1250}
              className="object-cover md:w-[600px] h-[300px] mx-auto rounded-lg"
            />
          <div>
            <div className="mt-5 flex flex-col md:flex-row text-center items-center justify-between px-5">
              <div className="font-bold mb-2">
                {domainData?.domainName} .privapp
              </div>
              <div className="flex flex-col">
                <div className="flex ml-auto gap-2">
                  <p className="text-white px-2">
                    {numeral(Number(priceData) / 10 ** 8).format("0,0.000")}
                  </p>
                  <Image
                    src="/priva_32.webp"
                    alt="Priva-Icon"
                    width={30}
                    height={30}
                    className="object-cover rounded-full shadow-xl shadow-primary/25"
                  />
                </div>
                <div className="flex">
                  {
                    _.includes(allOwnNFT?.map((item) => (item.tokenId)), BigInt(id)) ? <p className="bg-[#cdcdcd96] px-2 border[1px] mt-3 py-2 text-sm rounded-md text-gray-800">This domain belongs to you</p> : (

                      <div>
                        <button onClick={() => {
                          approveToken()
                        }} className={`${allowancedMarketPlaceAmount >= priceData ? "bg-[#cdcdcd96] border-none cursor-not-allowed text-gray-800" : "hover:bg-white mx-1 hover:text-black text-white hover:font-bold hover:border-transparent transilation delay-75 border-primary"} border-2  rounded-lg px-5 py-1 mt-2`}>
                          <p className={`${allowancedMarketPlaceAmount >= priceData ? "hover:animate-none " : "animate-pulse"}`}>approve</p>
                        </button>
                        <button onClick={() => {
                          buyDomain()
                        }} className={`${allowancedMarketPlaceAmount < priceData ? "bg-[#cdcdcd96] border-none cursor-not-allowed text-gray-800" : "hover:bg-white mx-1 hover:text-black text-white hover:font-bold hover:border-transparent transilation delay-75 border-primary"} border-2  rounded-lg px-5 py-1 mt-2`}>
                          <p className={`${allowancedMarketPlaceAmount < priceData ? "hover:animate-none " : "animate-pulse"}`}>{effectText()}</p>
                        </button>
                      </div>

                    )}
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col md:flex-row text-center justify-between px-5 py-5">
              <div className="flex flex-col gap-2">
                <Link
                  href={`https://bscscan.com/tx/${domainData?.transactionHash}`}
                  target="_blank"
                >
                  #nft &mdash; #privapp
                </Link>
                {/* <Button>Buy Domain</Button> */}
              </div>
              <div
                className="flex items-center justify-center mt-5 cursor-pointer"
                onClick={() =>
                   handleLike(id)
                  }
              >
                <BsFillSuitHeartFill
                  className={`${!like ? "visible text-gray-50 opacity-50" : "hidden"
                    } my-auto`}
                />
                <BsFillSuitHeartFill
                  className={`${like ? "visible text-primary" : "hidden"} my-auto`}
                />
                <p className="ml-1 font-medium text-gray-50 opacity-50">
                  {likesCount}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (<div className="animate-pulse my-4 border-gray-300 opacity-30 flex space-x-4">
        <div className="rounded-full bg-gray-300 w-[200px] h-[80px] md:w-[400px] md:h-[150px] lg:w-[600px] lg:h-[300px]"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-300 rounded col-span-2"></div>
              <div className="h-2 bg-gray-300 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>)}
    </>
  );
};

export default Card;
