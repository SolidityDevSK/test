import React from "react";
import MyAssets from "./MyAssets/MyAssets";
import MyActivities from "./MyActivities/MyActivities";
import MyRewards from "./MyRewards/MyRewards";

const DashboardContainer = ({ select }) => {
  let renderedComponent;

  switch (select) {
    case 1:
      renderedComponent = <MyActivities />;
      break;
    case 2:
      renderedComponent = <MyRewards />;
      break;
    default:
      renderedComponent = <MyAssets />;
      break;
  }

  return (
    <div className="w-full optionBG text-white">
      {renderedComponent}
    </div>
  );
};

export default DashboardContainer;
