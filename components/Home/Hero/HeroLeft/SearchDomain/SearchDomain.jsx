import React, { useContext } from "react";

import { BiSearchAlt } from "react-icons/bi";

import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import { TransactionContext } from "@/context/TransactionProvider";

const SearchDomain = () => {
  const {
    searchDomain,
    handleChangeDomainName,
    domainName,
    isExistsDomain,
  } = useContext(TransactionContext);

  return (
    <div>
      <div className="w-full md:mb-4 rounded-xl py-4">
        <div className="group relative flex flex-col text-sm my-4">
          <div className="flex items-center justify-center">
            <div className="flex max-md:w-10/12 w-full relative">
              <input
                id="domainName"
                type="text"
                autoComplete="off"
                onKeyDown={(e) => e.key === "Enter" ? searchDomain() : null}
                value={domainName}
                maxLength={20}
                placeholder="Select an unstoppable domain"
                onChange={(e) => handleChangeDomainName(e)}
                className="md:h-16 h-8 w-full max-md:text-[10px] text-lg rounded-md optionBG px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 border focus:ring-[#ffffffB7]"
              />
              <div className="bg-primary max-md:w-8 w-12 absolute flex md:h-16 h-8 rounded-r-md right-0 top-0">
                <BiSearchAlt
                  onClick={searchDomain}
                  className="cursor-pointer m-auto max-md:text-base text-2xl text-background"
                />
              </div>
            </div>
          </div>
          <div
            className={`flex ${
              domainName !== "" ? "opacity-100" : "opacity-0"
            } md:w-full w-11/12 mt-2 mx-auto`}
          >
            <span className="absolute block pt-3 text-foreground transition-all duration-200 ease-in-out">
              <span className={`text-white text-base cursor-default select-none`}>Your Domain :</span>
              <span
                className={`${
                  isExistsDomain ? "text-green-700" : "text-red-500"
                } text-base transition-all duration-500 font-medium`}
              >
                {` ${domainName}.privapp`}
              </span>
              {domainName && (
                <Link
                  className={`${
                    isExistsDomain
                      ? "opacity-100  ml-8"
                      : "opacity-0 ml-24"
                  } border-[1px] rounded-md delay-100 duration-1000 transition-all ease-in-out text-xs p-2`}
                  href="/domains"
                >
                  Now Mint
                  <span className="absolute top-0 h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                </Link>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDomain;
