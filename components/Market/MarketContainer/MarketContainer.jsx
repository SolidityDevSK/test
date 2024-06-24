import Card from "@/components/Layout/Card/Card";
import _ from "lodash";
import React, { useState } from "react";

const MarketContainer = ({ onSaleNFTs }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const paginatedData = _.chunk(onSaleNFTs, 4);
  
  return (
    <div className="w-full text-foreground">
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 lg:gap-5">
        {paginatedData &&
          paginatedData[currentPage]?.map((item, key) => <Card domain={item} key={key} />)}
      </div>

      <nav className="flex items-center justify-center">
        {paginatedData.length > 1 ? (<ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <a
                  onClick={(e) => {
                    e.preventDefault();
                    currentPage !== 0 && setCurrentPage(currentPage-1);
                  }}
              href="#"
              className="flex items-center justify-center px-4 h-10 ml-0 leading-tight bg-primary text-background rounded-l-lg hover:bg-foreground/10 hover:text-foreground transition-colors"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          {paginatedData.map((item, k) => (
            <li key={k}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  currentPage !== k && setCurrentPage(k);
                }}
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-foreground bg-foreground/25 hover:bg-primary/50 hover:text-foreground transition-colors"
              >
                {k + 1}
              </a>
            </li>
          ))}

          <li>
            <a
             onClick={(e) => {
              e.preventDefault();
              currentPage !== paginatedData.length-1 && setCurrentPage(currentPage+1);
            }}
              href="#"
              className="flex items-center justify-center px-4 h-10 ml-0 leading-tight bg-primary text-background rounded-r-lg hover:bg-foreground/10 hover:text-foreground transition-colors"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>) : ""}
      </nav>
    </div>
  );
};

export default MarketContainer;
