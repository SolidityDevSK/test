import PaginatedTable from "@/components/utils/PeginatedTable";
import { TransactionContext } from "@/context/TransactionProvider";
import React, { useContext } from "react";

const MyAssets = () => {
  const { allOwnNFT } = useContext(TransactionContext);

  return (
    <div className="flex items-center justify-center my-auto mx-auto mb-12">
      <div className="w-full mt-10 h-full">
        <PaginatedTable data={allOwnNFT} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default MyAssets;
