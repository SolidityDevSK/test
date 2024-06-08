import PaginatedTable from "@/components/utils/PeginatedTable";
import { TransactionContext } from "@/context/TransactionProvider";
import { usePrivappContractRead } from "@/hooks";
import React, { useContext, useEffect } from "react";
import { useAccount } from "wagmi";

const MyAssets = () => {
  const { allOwnNFT, setAllOwnNFT, allNftsIdOnSale } = useContext(TransactionContext);

  const { address } = useAccount()
  
  const { data } = usePrivappContractRead("domain", {
    functionName: "getAllDomains",
    args: [address]
  })

  useEffect(() => {
    setAllOwnNFT(data)
  }, [data])


  return (
    <div className="flex items-center justify-center my-auto mx-auto mb-12">
      <div className="w-full mt-10 h-full">
        <PaginatedTable data={allOwnNFT} onSalesNFTsId={allNftsIdOnSale} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default MyAssets;
