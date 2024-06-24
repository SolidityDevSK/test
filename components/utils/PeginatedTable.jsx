
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactLoading from "react-loading";
import { usePrivappContractWrite } from "@/hooks";
import { privappMarketPlaceAddress } from "@/lib";
import CardSkeleton from "./CardSkeleton";
import { TransactionContext } from "@/context/TransactionProvider";
import _ from "lodash";
import { useWaitForTransaction } from "wagmi";


const PaginatedTable = ({ data, itemsPerPage }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [saleValue, setSaleValue] = useState({});
  const [imageUrls, setImageUrls] = useState({});


  const [statusTransactions, setStatusTransactions] = useState({});

  const { isLoading, approvedDomainStatus, allSaleDetailDomains, setApporvedDomainStatus } = useContext(TransactionContext)

  console.log(allSaleDetailDomains,"allSaleDetailDomains");

  const processTransactionStatus = (success, error, successMessage, errorMessage) => {

    useEffect(() => {
      if (success) {
        const tokenId = Object.keys(statusTransactions)[0];
        setTimeout(() => {
          toast.success(successMessage);
          setStatusTransactions({
            [tokenId]: "end",
          });
        }, 5000);
      }
    }, [success]);

    useEffect(() => {
      if (error) {
        const tokenId = Object.keys(statusTransactions)[0];
        setStatusTransactions({
          [tokenId]: "end",
        });
        toast.error(errorMessage);
      }
    }, [error]);
  };


  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const { data: approveHash, write: approveDomainWrite } = usePrivappContractWrite("domain")

  const { write: createOfferWrite, isSuccess: createdOfferSuccessfull, isError: createdOfferError } = usePrivappContractWrite("market")
  const { write: cancelOfferWrite, isSuccess: canceledOfferSuccessfull, isError: canceledOfferError } = usePrivappContractWrite("market")



  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess, isError: isApproveError } =
    useWaitForTransaction({
      hash: approveHash?.hash,
    })


  processTransactionStatus(
    isApproveSuccess,
    isApproveError,
    "Approve successfully created!",
    "Sorry, the approve creation process failed. Please try again later."
  );

  processTransactionStatus(
    createdOfferSuccessfull,
    createdOfferError,
    "Offer successfully created!",
    "Sorry, the offer creation process failed. Please try again later."
  );

  processTransactionStatus(
    canceledOfferSuccessfull,
    canceledOfferError,
    "Offer cancellation successful!",
    "Sorry, the offer cancellation process failed. Please try again later."
  );




  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data?.slice(startIndex, endIndex);


  const approveDomain = (id) => {
    toast.info(
      "Creating approval. Please wait while the approval process is being completed."
    );
    setStatusTransactions({
      [id]: "processing",
    });
    approveDomainWrite({
      args: [privappMarketPlaceAddress, id],
      functionName: "approve"
    })

    // setTimeout(() => {
    //   setApporvedDomainStatus((prevStatus) => ({
    //     ...prevStatus,
    //     [id]: true
    //   }))
    // }, 6000);
  }

  const createOfferDomain = async (id) => {
    if (!saleValue[id]) return
   let mintedId = id.toString()
   let value = saleValue[id]
    toast.info(
      "Creating offer. Please wait while the offer is being processed."
    );
    setStatusTransactions({
      [mintedId]: "processing",
    });
    console.log(typeof mintedId, typeof saleValue[id], "datalarrr");
    await createOfferWrite({
      args: [mintedId, value],
      functionName: "createOffer",
    })
    setTimeout(() => {
      onSalesNFTsId.push(id)
    }, 6000);

  };

  const cancelOfferDomain = async (id) => {
    toast.info(
      "Canceling offer. Please wait while the cancellation process is being completed."
    );
    setStatusTransactions({
      [id]: "processing",
    });

   await cancelOfferWrite({ args: [id], functionName: "cancelOffer" })
  };

  return (

    <div className="items-center flex flex-col">
      <div className="mt-4 flex lg:text-md text-xs items-center mx-atuo">
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
      <div className="w-full mt-8">
        <div className="flex mx-auto w-4/5 justify-between">
          <div className="md:w-1/2 w-full md:pb-3 pb-1 border-b-2">
            <p className="md:text-base text-xs">Image</p>
          </div>
          <div className="w-full md:block hidden text-center border-b-2">
            <p className="md:text-base text-xs">Description</p>
          </div>
          <div className="md:w-1/2 w-[150px] text-center border-b-2 border-dashed">

          </div>
        </div>
        {itemsToDisplay?.map((item, index) => (
          <div key={`${item.domainId}-${index}`} className="flex-col">
            {!isLoading ? <CardSkeleton /> : (
              <div className="flex-col">
                <div className="flex w-4/5 mx-auto">
                  <div className="my-auto w-1/2">
                    <Image
                      className="lg:w-[250px md:w-[110px] w-[80px]"
                      src={`https://gateway.pinata.cloud/ipfs/${item.IpfsHash}`}
                      alt="card-image"
                      width={130}
                      height={130}
                    />
                  </div>
                  <div className="py-4 text-center md:block hidden w-full my-auto font-light">
                    <p className=" mr-2">Domain Name: <span>{item.DomainName}.priva</span></p>
                    <p className=" mr-2">Img Url:  <Link
                      href={
                        imageUrls[item.domainId]
                          ? imageUrls[item.domainId]
                          : ""
                      }
                    >
                      #Link
                    </Link></p>


                    <p className=" mr-2">Hash:   <span>{item.domainUri}</span></p>


                  </div>
                  <div className="my-auto w-1/2 h-full relative mx-auto z-10 bg-[#132027]">
                    <div className="flex md:text-xs text-[10px] md:w-[180px] w-[100px] mx-auto justify-between">
                      {_.some(allSaleDetailDomains,{ItemId: item.ItemId}) ? <p className="mx-auto text-primary animate-pulse">Token is on sale now</p> : (
                        <div>
                          <label className="my-auto mb-3 mr-3 w-full lg:text-md text-xs lg:font-light">
                            Selling Amount
                          </label>

                          <input
                            id={item.tokenId}
                            type="text" 
                            value={saleValue[item.tokenId] || ''} 
                            onChange={(e) => {
                              const inputValue = parseInt(e.target.value, 10);

                              if (!isNaN(inputValue) && inputValue <= 3200000 || e.target.value === '') {
                                setSaleValue((prevSaleValue) => ({
                                  ...prevSaleValue,
                                  [item.tokenId]: inputValue, 
                                }));
                              }
                            }}
                            className="md:mt-2 mt-2 md:h-8 text-center md:w-[80px] h-5 w-[70px] text-white rounded-md optionBG px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#ffffffB7]"
                          />

                        </div>
                      )}

                    </div>
                    {statusTransactions[item.tokenId] == "end" || !statusTransactions[item.tokenId] ? (

                      <div className="py-4 md:text-xs text-[10px] mx-auto md:w-[220px] flex justify-around">
                        <button
                          onClick={() =>
                            !item.Approval && approveDomain(item.tokenId)
                          }
                          className={`${item.Approval
                            ? "bg-[#cdcdcd96] border-none cursor-not-allowed text-gray-800"
                            : "bg-transparent"
                            } md:border border-[1px] rounded-lg md:px-4 px-2 py-1 md:py-2`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            // approvedDomainStatus[item.tokenId] && !_.includes(onSalesNFTsId, item.tokenId) &&
                             createOfferDomain(item.tokenId, saleValue)
                          }
                          className={`${!approvedDomainStatus[item.tokenId] ? "bg-[#cdcdcd96] border-none cursor-not-allowed text-gray-800" : (_.includes(onSalesNFTsId, item.tokenId)
                            ? "bg-[#cdcdcd96] border-none cursor-not-allowed text-gray-800"
                            : "bg-transparent"
                          )} md:border border-[1px] rounded-lg md:px-4 px-2 py-1 md:py-2`}
                        >
                          Sell
                        </button>
                        <button
                          onClick={() =>
                            _.some(allSaleDetailDomains,{ItemId: item.ItemId}) &&
                            cancelOfferDomain(item.ItemId)
                          }
                           className={`${!_.some(allSaleDetailDomains,{ItemId: item.ItemId})
                             ? "bg-[#cdcdcd96] border-none cursor-not-allowed text-gray-800"
                             : "bg-transparent"
                             } md:border border-[1px] rounded-lg md:px-4 px-2 py-1 md:py-2`}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <ReactLoading
                          type={"bars"}
                          color={"white"}
                          height={30}
                          width={25}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="md:hidden mx-auto mb-4 visible">
                  <div className="flex justify-between w-4/5 mx-auto">
                    <p className="text-xs">Details</p>
                    <button
                      onClick={() => {
                        openDetails != index
                          ? setOpenDetails(index)
                          : setOpenDetails(null);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div
                    className={`${openDetails == index ? "h-[80px]" : "h-0"
                      } border-t-[1px] transition-all delay-200 border-dotted pt-2 px-2 text-[9px]`}
                  >
                    <div className="flex">
                      <p className="mr-1">Domain Name: </p>
                      <p>{item.domainName}.priva</p>
                    </div>
                    <div className="flex">
                      <p className="mr-1">Img Url:</p>
                      <Link
                        href={`https://gateway.pinata.cloud/ipfs/${item.domainUri}`}
                      >
                        <p>#Link</p>
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <p className="mr-1">Hash</p>
                      <p className="my-auto">{item.domainUri}</p>
                    </div>
                  </div>
                </div> */}

              </div>
            )}
            <div className="h-[2px] w-4/5 mx-auto bg-white"></div>
          </div>

        ))}
      </div>
    </div>


  );
};

export default PaginatedTable;
