import ActivityTable from "@/components/utils/ActivityTable";
import { TransactionContext } from "@/context/TransactionProvider";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useAccount } from "wagmi";


const MyActivities = () => {

const {address } = useAccount()
  

  const [mergedArray, setMergedArray] = useState([]);

  const {allOwnMarketEventData} = useContext(TransactionContext)


  useEffect(() => {
    let sortedData = _.sortBy(allOwnMarketEventData, 'Timestamp').reverse();
    setMergedArray(sortedData);
  }, [address]);

  const itemsPerPage = 5;
  console.log(mergedArray, "mergedArray");
  return (
    <div className="lg:px-20 md:px-10 px-2 my-10">
      <ActivityTable data={mergedArray} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default MyActivities;
