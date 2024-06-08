import { TransactionContext } from "@/context/TransactionProvider";
import { privappMarketPlaceAddress } from "@/lib";
import Link from "next/link";
import React, { useContext, useState } from "react";

const ActivityTable = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { mintingCost } = useContext(TransactionContext);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToDisplay = data?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const checkPayAmount = (item) => {
    switch (item.event) {
      case "OfferCreated":
        return (
          Number(item.returnValues.price) / (10 ** 8)
        );
      case "OfferCancelled":
        return (
          Number(item.returnValues.price) / (10 ** 8)
        );
        case "DomainSold":
          return(
            Number(item.returnValues.price) / (10 ** 8)
          )

      default:
        return mintingCost;
    }
  }

  const checkFromValue = (item) => {
    switch (item.event) {
      case "OfferCreated":
        return (
          item.returnValues.seller.slice(0, 5).toUpperCase() + "..." + item.returnValues.seller.slice(-5).toUpperCase()
        );
      case "DomainSold":
        return (
          item.returnValues.seller.slice(0, 5).toUpperCase() + "..." + item.returnValues.seller.slice(-5).toUpperCase()
        );
      case "OfferCancelled":
        return (
          item.returnValues.seller.slice(0, 5).toUpperCase() +
          "..." +
          item.returnValues.seller.slice(-5).toUpperCase()
        );
      default:
        return "0x000...00000";
    }
  };
  const checkToValue = (item) => {
    switch (item.event) {
      case "OfferCreated":
        return "Privapp MarketPlace Contract";
      case "OfferCancelled":
        return "Privapp MarketPlace Contract";
      case "Cancel Offer":
        return (
          privappMarketPlaceAddress.slice(0, 5).toUpperCase() + "..." + privappMarketPlaceAddress.slice(-5).toUpperCase()
        );
      case "DomainSold":
        return (
          item.returnValues.buyer.slice(0, 5).toUpperCase() + "..." + item.returnValues.buyer.slice(-5).toUpperCase()
        );
      default:
        return (
          item.address.slice(0, 5) +
          "..." +
          item.address.slice(-5)
        );
    }
  };

  return (
    <div className="h-[60vh] flex flex-col justify-between">
      <div>
        <div className="grid mb-8 lg:px-2 grid-cols-12 md:text-lg text-sm text-primary">
          <div className="md:col-span-2 col-span-3">
            <p>#Type</p>
          </div>
          <div className="md:flex hidden md:col-span-1 col-span-3 text-center">
            <p className="mx-auto">#Item Id</p>
          </div>
          <div className="md:col-span-3 flex col-span-3">
            <p className="mx-auto">#From</p>
          </div>
          <div className="md:col-span-3 flex col-span-3">
            <p className="mx-auto">#To</p>
          </div>
          <div className="md:col-span-2 col-span-3 flex">
            <p className="mx-auto">#Price</p>
          </div>
          <div className="col-span-1 text-center md:flex hidden">
            <p className="mx-auto">#TxId</p>
          </div>
        </div>
        {
          itemsToDisplay?.map((item, key) => (
            <div
              key={key}
              className="cursor-pointer lg:px-2 lg:text-base md:text-sm text-xs grid grid-cols-12 border-b-2 py-4 hover:bg-[#1d272c] text-white"
            >
              <div className="md:col-span-2 col-span-3">
                <p>{item.event}</p>
              </div>
              <div className="md:flex hidden md:col-span-1 col-span-3 text-center">
                <p className="mx-auto">{item?.returnValues?.tokenId?.toString()}</p>
              </div>
              <div className="md:col-span-3 flex col-span-3">
                <p className="mx-auto">
                  {checkFromValue(item)}
                </p>
              </div>
              <div className="md:col-span-3 flex col-span-3">
                <p className="mx-auto">
                  {checkToValue(item)}
                </p>
              </div>
              <div className="md:col-span-2 col-span-3 flex">
                <p className="mx-auto">
                  {checkPayAmount(item) + " "}
                  bPrivapp
                </p>
              </div>
              <div className="col-span-1 text-center md:flex hidden">

                <Link
                  className="mx-auto"
                  target="__blank"
                  href={`https://sepolia.etherscan.io/tx/${item.transactionHash}`}
                >
                  Tx
                </Link>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full mt-5">
        <div className="flex w-2/3 mx-auto justify-center md:text-md text-xs text-white">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`mx-1 p-2 w-[30px] text-center border rounded ${page === currentPage ? "selectBG" : "optionBG"
                }`}
              onClick={() => handleChangePage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTable;
