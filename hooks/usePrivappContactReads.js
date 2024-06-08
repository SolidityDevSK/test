import { useContractReads } from "wagmi";

export const usePrivappContactReads = (contractConfigurations) => {
 
  const contracts = contractConfigurations.map((config) => {
    return {
      address: config.address,
      abi: config.abi,
      functionName: config.functionName,
      args: config.args || [],
      watch: true,
    };
  });

  const { data, isError, isLoading } = useContractReads({ contracts });

  return { data, isError, isLoading};
};
