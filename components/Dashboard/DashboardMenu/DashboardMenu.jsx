import React, { useState } from "react";

const menuData = [
  { text: "My Assets" },
  { text: "My Activities" },
  { text: "My Rewards" },
];
const DashboardMenu = ({ set, select }) => {
  return (
    <div className="text-white flex justify-around md:w-[470px] w-9/12 border-b-2 mb-4 mx-auto my-auto md:text-sm text-xs">
      {menuData.map((item, i) => (
        <div
          onClick={() => set(i)}
          key={i}
          className={`${
            select == i ? "selectBG" : "optionBG"
          } border-[1px] cursor-pointer my-3 md:w-[128px] md:h-10 w-[90px] h-6 flex rounded-lg items-center justify-center`}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default DashboardMenu;
