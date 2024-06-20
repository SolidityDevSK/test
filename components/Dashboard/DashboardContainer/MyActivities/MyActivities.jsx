import ActivityTable from "@/components/utils/ActivityTable";
import { TransactionContext } from "@/context/TransactionProvider";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useAccount } from "wagmi";


const MyActivities = () => {

const {address } = useAccount()
  

  const [mergedArray, setMergedArray] = useState([]);

  const { domainEvents, marketPlaceEvents} = useContext(TransactionContext)
  
  console.log(domainEvents, marketPlaceEvents, "da");

  let filteredMarketPlaceEvents = marketPlaceEvents?.filter(item => Object.values(item.Log.returnValues).includes(address));
  let filteredDomainEvents = domainEvents?.filter(item => Object.values(item.Log.returnValues).includes(address));


  useEffect(() => {
    let newArray = [...filteredDomainEvents, ...filteredMarketPlaceEvents];
    let sortedData = _.sortBy(newArray, 'blocknumber').reverse();
    setMergedArray(sortedData);
  }, [address]);

  const itemsPerPage = 7;
  
  return (
    <div className="lg:px-20 md:px-10 px-2 my-10">
      <ActivityTable data={mergedArray} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default MyActivities;
