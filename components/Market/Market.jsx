import React, { useContext, useEffect, useState } from "react";
import { MarketContainer, MarketFilter } from "./";
import { TransactionContext } from "@/context/TransactionProvider";


const Market = () => {

  const [inputValue, setInputValue] = useState("")


  const { allSaleDetailDomains } = useContext(TransactionContext);

  const [filteredId, setFilteredId] = useState([])

  useEffect(() => {
    const filteredDomains = allSaleDetailDomains?.filter(domain => domain.domainName.toLowerCase().startsWith(inputValue.toLowerCase()));
    let allFilteredId = []
    if (filteredDomains) {
      filteredDomains.map((i) => {
        allFilteredId.push(i.tokenId)
      })
    }else{
      allSaleDetailDomains?.map((i)=>{
        allFilteredId.push(i.tokenId)
      })
    }
    setFilteredId(allFilteredId)
  }, [inputValue, allSaleDetailDomains])

  return (
    <div>
      <MarketFilter inputValue={inputValue} setInputValue={setInputValue} />
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="lg:col-span-4">
          <MarketContainer onSaleNFTs={filteredId} />
        </div>
      </div>
    </div>
  );
};

export default Market;
