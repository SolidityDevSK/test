import { usePrivappContactReads, usePrivappContractRead } from "@/hooks";
import {
  privappDomainNFTAbi,
  privappDomainNFTAddress,
  privappTokenAbi,
  privappTokenAddress,
  privappMarketPlaceAbi,
  privappMarketPlaceAddress,
} from "@/lib";
import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext();

import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import Web3 from "web3";

export const TransactionProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [domainName, setDomainName] = useState("");

  const [privBalance, setPrivBalance] = useState(0);
  const [isExistsDomain, setExistDomain] = useState(false);
  const [mintingCost, setMintingCost] = useState(0);
  const [mintableStatus, setMintableStatus] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const [allowancedAmount, setAllowancedAmount] = useState(0);
  const [allowancedMarketPlaceAmount, setAllowancedMarketPlaceAmount] = useState(0)
  const [selectBGImage, setBgImage] = useState(0);
  const [allOwnNFT, setAllOwnNFT] = useState([])
  const [selectFilter, setFilter] = useState("");
  const [selectMarketFilter, setMarketFilter] = useState("");
  const [allSaleDetailDomains, setAllSaleDetailDomains] = useState([])
  const [approvedDomainStatus, setApporvedDomainStatus] = useState({})
  const [allNftsIdOnSale, setNftsIdOnSale] = useState([])

  const [domainEvents, setDomainEvents] = useState({})
  const [marketPlaceEvents, setMarketPlaceEvents] = useState({})

  const [totalSoldDomains, setTotalSoldDomains] = useState(0)
  const [totalMintedDomains, setTotalMintedDomains] = useState(0)

  const [randomSaleDomainIds, setRandomSaleDomainIds] = useState([])

  const [profileImgUrl, setProfileImageUrl] = useState("")

  const [isLoading, setLoading] = useState(false);


  const [animationEnd, setAnimationEnd] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setAnimationEnd(true)
    }, 200)
  })

  const [selectAuction, setAuction] = useState({
    select: "create",
  });


  const [likesData, setLikesData] = useState([])



  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  useEffect(() => {
    getAllTransactions()
  }, [])


  const privTokenContract = {
    address: privappTokenAddress,
    abi: privappTokenAbi,
  };

  const privDomainContract = {
    address: privappDomainNFTAddress,
    abi: privappDomainNFTAbi,
  };

  const privMarketPlaceContract = {
    address: privappMarketPlaceAddress,
    abi: privappMarketPlaceAbi,
  };

  const contractConfigurations = [
    {
      ...privDomainContract,
      functionName: "domainExists",
      args: [domainName],
    },
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
    },
    {
      ...privDomainContract,
      functionName: "getAllDomains",
      args: [address],
    },
    {
      ...privTokenContract,
      functionName: "allowance",
      args: [address, privappMarketPlaceAddress]
    },
    {
      ...privMarketPlaceContract,
      functionName: "getAllSaleItem",
    },

  ];


  const { data: mutlipleContractData, isError: mutlipleContractError } = usePrivappContactReads(
    contractConfigurations
  );


  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch('/api/likes');
        const data = await res.json();
        setLikesData(data);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, []);


  useEffect(() => {
    if (!mutlipleContractData) return

    getAllTransactions();
    setAllowancedAmount(Number(mutlipleContractData[1]?.result));
    setPrivBalance(Number(mutlipleContractData[2].result));
    setMintingCost(Number(mutlipleContractData[3].result));

    setAllOwnNFT(mutlipleContractData[4]?.result);
    setAllowancedMarketPlaceAmount(mutlipleContractData[5]?.result?.toString())
    setAllSaleDetailDomains(mutlipleContractData[6].result)
    Number(mutlipleContractData[1].result) > Number(mutlipleContractData[3].result)
      ? setApproveStatus(true)
      : setApproveStatus(false);

  }, [mutlipleContractData]);

  useEffect(() => {
    getAllData()
  }, [allOwnNFT])

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000);
  }, [mutlipleContractData]);


  useEffect(() => {
    setMintableStatus(!approveStatus)
  }, [approveStatus])

  const handleChangeDomainName = (e) => {
    console.log(e.key, e=== 'Enter', e ,"walue");
    // if (e.key === 'Enter') {

    //   searchDomain()
    // }
    if (isExistsDomain) setExistDomain(false);
    setDomainName(e);
  };

  const getAllData = async () => {
    if (!allOwnNFT) return
    const web3 = new Web3("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_API_KEY)
    const domainContract = new web3.eth.Contract(privappDomainNFTAbi, privappDomainNFTAddress)
    for (const item of allOwnNFT) {
      var approvedTokenStatus = await domainContract.methods.checkAllowanceStatus(privappMarketPlaceAddress, item.tokenId.toString()).call()
      setApporvedDomainStatus((prevStatus) => ({
        ...prevStatus,
        [item.tokenId]: approvedTokenStatus
      }))
    }
  };

  const getAllTransactions = async () => {
    const web3 = new Web3("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_API_KEY)
    const domainContract = new web3.eth.Contract(privappDomainNFTAbi, privappDomainNFTAddress)
    const marketplaceContract = new web3.eth.Contract(privappMarketPlaceAbi, privappMarketPlaceAddress)
    try {
      const domainContractEvents = await domainContract.getPastEvents('DomainMinted', {
        fromBlock: 0,
        toBlock: 'latest'
      });
      const marketPlaceContractEvents = await marketplaceContract.getPastEvents("allEvents", {
        fromBlock: 0,
        toBlock: 'latest'
      });
      setTotalMintedDomains(domainContractEvents.length)
      setTotalSoldDomains(marketPlaceContractEvents.length)
      const allOnSaleNFTsId = await marketplaceContract.methods.getSaleNFTs().call();

      setNftsIdOnSale(allOnSaleNFTsId);
      setDomainEvents(domainContractEvents);
      setMarketPlaceEvents(marketPlaceContractEvents)

    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const searchDomain = () => {
    if (domainName && !mutlipleContractError) {
      toast.info("Domain is searching...");

      setTimeout(() => {
        if (!mutlipleContractData[0].result.domainName) {
          setExistDomain(true);
          toast.success("Domain is available!");
        } else {
          setExistDomain(false);
          toast.error("The domain name has already been sold!");
        }
      }, 2000); 
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
        setApproveStatus,
        approveStatus,
        mintableStatus,
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
        setAllOwnNFT,
        getAllData,
        approvedDomainStatus,
        setApporvedDomainStatus,
        isLoading,
        getAllTransactions,
        domainEvents,
        marketPlaceEvents,
        allNftsIdOnSale,
        setAllSaleDetailDomains,
        allSaleDetailDomains,
        allowancedMarketPlaceAmount,
        profileImgUrl,
        setProfileImageUrl,
        randomSaleDomainIds,
        setRandomSaleDomainIds,
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
