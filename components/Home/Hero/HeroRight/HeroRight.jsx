import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { TransactionContext } from "@/context/TransactionProvider";
import Web3 from "web3";
import { privappDomainNFTAbi, privappDomainNFTAddress } from "@/lib";



const ImageComponent = ({ src }) => {
  const { animationEnd } = useContext(TransactionContext)
  return (
    <div className={`transition-class relative hover:z-50 m-1 `}>
      {animationEnd ? (
        <Tilt
          scale={1.5}
          transitionSpeed={2500}
          className="relative hover:z-50 m-1"
        >
          <Image
            className="rounded-lg shadow-2xl shadow-primary/25 md:w-[320px] md:h-[180px] w-[200px] h-[100px] object-cover"
            width={250}
            height={250}
            src={src}
            alt="Privapp"
            title="Privapp"
            priority={true}
          />
        </Tilt>
      ) : (
        <div className="animate-pulse border-gray-600 opacity-30 flex space-x-4">
          <div className="bg-gray-600 md:w-[280px] md:h-[180px] w-[200px] h-[100px]"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-gray-600"></div>
           
          </div>
        </div>
      )}
    </div>
  );
}

const HeroRight = () => {

  const { allSaleDetailDomains, setRandomSaleDomainIds } = useContext(TransactionContext)
  
  const [data, setData] = useState([
    "/nft-1.jpg",
    "/nft-2.jpg",
    "/nft-3.jpg",
    "/nft-4.jpg"
  ]);




  useEffect(() => {
    if (allSaleDetailDomains?.length > 3) {
      const randomItems = _.sampleSize(allSaleDetailDomains, 4);

      const randomId = _.map(randomItems, "tokenId")
      setRandomSaleDomainIds(randomId)

      getRandomDomainUri(randomId)
    }
  }, [allSaleDetailDomains])


  const getRandomDomainUri = async (randomIds) => {

    const web3 = new Web3("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_API_KEY)
    const contract = new web3.eth.Contract(privappDomainNFTAbi, privappDomainNFTAddress)

    try {
      const uriPromises = randomIds.map(async (tokenId) => {
        const result = await contract.methods.getDomainInformationById(tokenId.toString()).call();
        return result;
      });
      const uris = await Promise.all(uriPromises);

      let ipfsHashs = _.map(uris, "ipfsHash")
      let srcData = _.map(ipfsHashs, (hash) => `https://gateway.pinata.cloud/ipfs/${hash}`);
      setData(srcData)
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }

  return (
    <div className="relative flex flex-col mx-auto px-5">
      <div className="grid grid-cols-2 gap-4 mx-auto">
        {data.map((src, index) => (
          <ImageComponent key={index} src={src} className="absolute inset-0 w-full h-full object-cover" />
        ))}
      </div>
    </div>
  );
};

export default HeroRight;