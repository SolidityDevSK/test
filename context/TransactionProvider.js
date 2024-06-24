import { usePrivappContactReads } from "@/hooks";
import {
  privappDomainNFTAbi,
  privappDomainNFTAddress,
  privappTokenAbi,
  privappTokenAddress,
} from "@/lib";
import { createContext, useEffect, useState } from "react";
import _ from "lodash"




export const TransactionContext = createContext();

import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export const TransactionProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [domainName, setDomainName] = useState("");
  const [privBalance, setPrivBalance] = useState(0);
  const [isExistsDomain, setExistDomain] = useState(false);
  const [mintingCost, setMintingCost] = useState(0);
  const [allOwnMarketEventData,setAllOwnMarketEventData]= useState([])
  const [selectBGImage, setBgImage] = useState(0);
  const [allOwnNFT, setAllOwnNFT] = useState([]);
  const [selectFilter, setFilter] = useState("");
  const [selectMarketFilter, setMarketFilter] = useState("");
  const [allSaleDetailDomains, setAllSaleDetailDomains] = useState([]);
  const [approvedDomainStatus, setApporvedDomainStatus] = useState({});
  const [approvalTokenStatus,setApprovalTokenStatus] = useState([]);
  const [domainEvents, setDomainEvents] = useState([]);
  const [totalSoldDomains, setTotalSoldDomains] = useState(0);
  const [totalMintedDomains, setTotalMintedDomains] = useState(0);
  const [randomSaleDomainItems, setRandomSaleDomainItems] = useState([]);
  const [profileImgUrl, setProfileImageUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);


  const [selectAuction, setAuction] = useState({
    select: "create",
  });

  const [likesData, setLikesData] = useState([]);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const privTokenContract = {
    address: privappTokenAddress,
    abi: privappTokenAbi,
  };

  const privDomainContract = {
    address: privappDomainNFTAddress,
    abi: privappDomainNFTAbi,
  };

  const contractConfigurations = [
    {
      ...privTokenContract,
      functionName: "allowance",
      args: [address, privappDomainNFTAddress],
    },
    {
      ...privTokenContract,
      functionName: "balanceOf",
      args: [address],
    },
    {
      ...privDomainContract,
      functionName: "showPrivPrice",
    }
  ];


  const { data: mutlipleContractData, isError: mutlipleContractError } = usePrivappContactReads(
    contractConfigurations
  );


  const fetchData = async () => {
    await Promise.all([getAllData()]);
    setAnimationEnd(true);
  };

  useEffect(() => {
    getAllData()
    fetchData();
  }, []);

  useEffect(() => {
    if (!mutlipleContractData) return;
    setPrivBalance(Number(mutlipleContractData[1].result));
    setMintingCost(Number(mutlipleContractData[2].result));

  }, [mutlipleContractData]);



  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, [mutlipleContractData]);


 
  const handleChangeDomainName = (e) => {
    const loverCase = e.target.value.toLowerCase();
    const sanitizedValue = loverCase.replace(/[^a-zA-Z0-9-]/g, '');
    if (isExistsDomain) setExistDomain(false);
    setDomainName(sanitizedValue);
  };

  const getAllData = async () => {

    try {
      const domainContractEventsResp = await fetch('/api/minteddomain');
 
      const soldDomainEventsResp = await fetch('/api/soldmarket');

      const domainLikeEventsResp = await fetch('/api/likes');

      const activeSaleDomainsResp = await fetch('/api/activemarket');

      const allMarketEventResp = await fetch('/api/allmarketevent')

      const appravalAmountResp = await fetch("/api/approvedtoken")


      const activeSaleDomainsData = await activeSaleDomainsResp.json();
      const domainLikeEventsData = await domainLikeEventsResp.json();
      const domainContractEventsData = await domainContractEventsResp.json();
      const soldDomainEventsData = await soldDomainEventsResp.json();
      const allMarketEventData = await allMarketEventResp.json();
      const appravalAmountData = await appravalAmountResp.json();

 

      setAllSaleDetailDomains(activeSaleDomainsData)
      setLikesData(domainLikeEventsData);
      setTotalMintedDomains(domainContractEventsData);
      setTotalSoldDomains(soldDomainEventsData.data.length);
      // const allOnSaleNFTsId = await marketplaceContract.methods.getSaleNFTs().call();
      console.log(appravalAmountData,"appravalAmountData");
      setApprovalTokenStatus((_.filter(appravalAmountData, (item)=>item.From === address)[0]))
      setAllOwnMarketEventData(_.filter(allMarketEventData.data, (item) => item.From === address || item.To === address))
      setDomainEvents(domainContractEventsData);
      if (!address || !domainContractEventsData) return;
      let allOwnNFTItems = _.filter(domainContractEventsData, (item)=>item.From === address)
      setAllOwnNFT(allOwnNFTItems)
      for (const item of allOwnNFTItems) {
        var approvedTokenStatus = item.Approval
        setApporvedDomainStatus((prevStatus) => ({
          ...prevStatus,
          [item.TokenId]: approvedTokenStatus
        }));
      }

    } catch (error) {
      console.error('Hata:', error);
    }


   
  };


  const searchDomain = async () => {
    toast.info("Domain is searching...");

    try {
        const response = await fetch('/api/minteddomain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ domainName })
        });

        const result = await response.json();

        console.log(result, "result");
        setTimeout(() => {
            if (!result.DomainName) {
                setExistDomain(true);
                toast.success("Domain is available!");
            } else {
                setExistDomain(false);
                toast.error("The domain name has already been sold!");
            }
        }, 2000);
    } catch (error) {
        console.error("Error searching domain:", error);
        toast.error("An error occurred while searching the domain.");
    }
};


  return (
    <TransactionContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        privBalance,
        handleChangeDomainName,
        searchDomain,
        domainName,
        setDomainName,
        mintingCost,
        isExistsDomain,
        selectBGImage,
        setBgImage,
        approvalTokenStatus,
        selectFilter,
        setFilter,
        selectMarketFilter,
        setMarketFilter,
        selectAuction,
        setAuction,
        isConnecting,
        isDisconnected,
        isConnected,
        allOwnNFT,
        allOwnMarketEventData,
        allSaleDetailDomains,
        setAllOwnNFT,
        getAllData,
        approvedDomainStatus,
        setApporvedDomainStatus,
        isLoading,
        domainEvents,
        profileImgUrl,
        setProfileImageUrl,
        randomSaleDomainItems,
        setRandomSaleDomainItems,
        animationEnd,
        likesData,
        totalSoldDomains,
        totalMintedDomains
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

