import Link from "next/link";
import React, { useContext } from "react";
import Skeleton from "../../Skeleton/Skeleton";
import { TransactionContext } from "@/context/TransactionProvider";

const MenuContent = [
  { header: "Home", path: "/" },
  { header: "Market", path: "/market" },
  { header: "Domains", path: "/domains" },
];

const Menu = () => {
  const { animationEnd } = useContext(TransactionContext);
  return (
    <div className="flex gap-10 my-auto w-full justify-between mr-10">
      {animationEnd ? (
        MenuContent.map((item, index) => (
          <Link
            className="lg:text-xl font-semibold tracking-wide text-sm text-white"
            key={index}
            href={item.path}
          >
            {item.header}
          </Link>
        ))
      ) : (

        MenuContent.map((_, index) => (
         <div key={index} className="flex h-fit my-auto">
           <Skeleton width={130} height={10} />
         </div>
        ))
      )}
    </div>
  );
};

export default Menu;
