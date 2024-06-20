import { TransactionContext } from "@/context/TransactionProvider";
import React, { useContext } from "react";

const HeroLeftFooter = () => {
   const {  allNftsIdOnSale,   totalSoldDomains, totalMintedDomains } = useContext(TransactionContext)


// let filteredMarketPlaceEvents = marketPlaceEvents.filter(item => item.event === "DomainSold");

// let filteredDomainEvents = domainEvents?.filter(item => item.event === "DomainMinted");

  return (
      <div className="opacity-80">
        <div className="flex flex-col justify-between">
          <p className="md:text-2xl text-md text-primary">Explore the transactions on Privapp Network's NFT Marketplace.</p>
          <div className="md:text-xl text-sm flex md:flex-row flex-col justify-between text-primary mt-4">
            <p>Sold Domains: <span className="text-white">{totalSoldDomains.length}</span></p>
            <p>Minted Domains: <span className="text-white">{totalMintedDomains}</span> </p>
            <p>Available for Sale: <span className="text-white">{allNftsIdOnSale?.length}</span></p>
          </div>
        </div>
      </div>
  );
};

export default HeroLeftFooter;
