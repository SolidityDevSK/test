import { useContractRead } from "wagmi";
import {
  privappDomainNFTAbi,
  privappMarketPlaceAbi,
  privappTokenAbi,
  privappDomainNFTAddress,
  privappMarketPlaceAddress,
  privappTokenAddress,
} from "@/lib";

export const usePrivappContractRead = (type, param) => {
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


  return useContractRead({
    address: address,
    abi: abi,
    functionName: param.functionName,
    args: param.args,
    watch: param.watch ?  param.watch : false
  });

};
