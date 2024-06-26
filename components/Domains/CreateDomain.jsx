import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "react-toastify/dist/ReactToastify.css";

import { ImageSlider } from "@/components/utils/ImageSlider";
import { Search, X } from "lucide-react";
import { TransactionContext } from "@/context/TransactionProvider";
import { usePrivappContractRead, usePrivappContractWrite } from "@/hooks";
import { privappDomainNFTAddress } from "@/lib";
import { useAccount, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { useConnectModal } from "@rainbow-me/rainbowkit";





const CreateDomain = () => {
  const [reMintable, setReMintable] = useState(false)
const  {openConnectModal} = useConnectModal()
  const {
    handleChangeDomainName,
    domainName,
    setDomainName,
    searchDomain,
    selectBGImage,
    setBgImage,
    getAllData,
    setAllOwnNFT,
    approvalTokenStatus,
    mintingCost
  } = useContext(TransactionContext);

  const { address } = useAccount();


  const {data: approveHash, isSuccess: approveIsSuccess, isLoading: approveLoading, isError: approveError, write: approveWrite } =
    usePrivappContractWrite("token");

  var {
    data:mintHash,
    isLoading: mintIsLoading,
    isSuccess: mintIsSuccess,
    write: mintWrite,
    
  } = usePrivappContractWrite("domain");

  const { isLoading: isMintedLoading, isSuccess: isMintedSuccess } =
    useWaitForTransaction({
      hash: mintHash?.hash,
    })
    const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } =
    useWaitForTransaction({
      hash: approveHash?.hash,
    })


    useEffect(()=>{
      if(isMintedLoading){
        toast.loading("Domain is minting...!")
      }
      if(isMintedSuccess) {
        toast.success("Domain is minted!")
        setDomainName("")
        setReMintable(false)
        setTimeout(() => {
          setReMintable(true)
          getAllData();
  
        }, 5000)
  
      }

    },[isMintedSuccess])


    // useEffect(()=>{      
    //   if(isApproveSuccess) {
    //     setApproveStatus(true)
    //   }
    // },[isApproveSuccess])



  const { data } = usePrivappContractRead("domain", {
    functionName: "getAllDomains",
    args: [address]
  })


  useEffect(() => {
    setAllOwnNFT(data)
  }, [data])

  useEffect(() => {
    setTimeout(() => {
      getAllData();
    }, 5000);
  }, [approveIsSuccess])



  const approveToken = async () => {
    if(!address) return openConnectModal()
    approveWrite({
      args: [privappDomainNFTAddress, 1*10**6*10**8],
      functionName: "approve", 
    })
  };



  const mintDomainAndToast = async () => {
    console.log(domainName);
    if (!address || !domainName) return
    try {
      mintWrite({
        args: [domainName, defaultBGPinataHash[selectBGImage]],
        functionName: "mintDomain",
      })


    } catch (error) {
      console.log("error");
    }

  };

  const handleSelectBG = (index) => {
    setBgImage(index);
  };

  const selectImgBGData = [
   "/domain/domain1.jpg",
   "/domain/domain2.jpg",
   "/domain/domain3.jpg",
   "/domain/domain4.jpg",
  ];

  const defaultBGPinataHash = [
    "QmWGBPvsV3oJQ1EHwJfJvGMAp4djdnnZ1r4Rxz8DjsJTjH",
    "QmRQf7PPCXTvAiBevVudKGTeVqq54xh1RN1amUF9zNvqGg",
    "QmZqpHxjuZ4Fty6NU5w7SFyuxMxNTmHWDQTJaRfWDTdcSa",
    "QmUv7xkvDzEzdrfWUvFEv7BPW15WGZQR723ttPYcbZzFMY",
  ]


  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="container mx-auto mt-20 ">
        <div className="flex flex-col text-white items-center justify-center gap-y-2 w-full">
          <div className="flex items-center gap-x-1 text-2xl my-10 font-bold">
            Create your
            <span className="text-primary font-thin animate-pulse">Domain</span>
          </div>
          <div className="flex items-center justify-center gap-x-2 w-full">
            <Input
              placeholder="Domain Name"
              autoComplete="off"
              onKeyDown={(e) => e.key === "Enter" ? searchDomain() : null}
              className="w-full md:w-1/2"
              value={domainName == "" ? "" : domainName}
              onChange={(e) => handleChangeDomainName(e)}
            />
            <Button>
              <Search
                onClick={() => {
                  searchDomain();
                }}
              />
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <ImageSlider
            images={selectImgBGData}
            isSelected={selectBGImage}
            handleSelectBG={handleSelectBG}
          />
        </div>

        <div className="mt-8 w-fit mx-auto"
        >
          <p className="text-white text-center mb-2 text-base">
            Result
          </p>
          <div className="relative">
            <Image
              src={selectImgBGData[selectBGImage] ? selectImgBGData[selectBGImage] : ""}
              width={150}
              height={150}
              alt={domainName}
              className="rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black rounded-lg opacity-50 "></div>
            <div className="absolute bottom-0 flex items-center justify-center rounded-lg">
              <Image src="/logo.svg" alt="privLogo" width={25} height={25} />
            </div>
          </div>
        </div>
        <div className="flex gap-10 mt-10 items-center justify-center">
          {approvalTokenStatus?.DomainApprovalBalance && approvalTokenStatus.DomainApprovalBalance > mintingCost ?
            <Button variant="destructive" className="cursor-not-allowed">
              Approved
            </Button> : <Button
              onClick={() => approveToken()}
              className={`bg-transparent text-white transition-all duration-300 hover:bg-primary border-primary border-2 ${isMintedLoading ? "animate-pulse" : ""}`}
            >
             {isApproveLoading ? "Processing..." : "Approve" }
            </Button>}
          <Button variant={!reMintable&& approvalTokenStatus?.DomainApprovalBalance && !approvalTokenStatus?.DomainApprovalBalance > mintingCost ? "destructive" : ""}
            className={mintIsSuccess && !reMintable ? "cursor-not-allowed" : (isMintedLoading ? "animate-pulse" : "")}
            onClick={() => !isMintedLoading && mintDomainAndToast()}>
            {isMintedLoading || mintIsLoading ? 'Mint is loading...!' : (isMintedSuccess && !reMintable ? 'Minted!' : 'Mint Domain')}
          </Button>
   
        </div>
      </div>
    </div>
  );
};

export default CreateDomain;
