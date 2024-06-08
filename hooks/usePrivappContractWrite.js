import { useContractWrite } from "wagmi";
import {
  privappDomainNFTAbi,
  privappMarketPlaceAbi,
  privappTokenAbi,
  privappDomainNFTAddress,
  privappMarketPlaceAddress,
  privappTokenAddress,
} from "@/lib";

export const usePrivappContractWrite = (type) => {
  let address;
  let abi;
  switch (type) {
    case "domain":
      address = privappDomainNFTAddress;
      abi = privappDomainNFTAbi;
      break;
    case "market":
      address = privappMarketPlaceAddress;
      abi = privappMarketPlaceAbi;
      break;
    case "token":
      address = privappTokenAddress;
      abi = privappTokenAbi;
      break;
    default:
      break;
  }


  const { data, isLoading, isError, isSuccess, write } = useContractWrite({
    address: address,
    abi: abi,
  })

  return {data, isLoading, isError, isSuccess, write  };
};
