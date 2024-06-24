import React, {  useState } from "react";
import { DashboardContainer, DashboardMenu } from ".";



const Dashboard = () => {
  const [selectMenu, setMenu] = useState(0);


  return (
      <div className="lg:w-5/6 w-full mx-auto mt-12">
        <div className="relative justify-center items-center">
          <DashboardMenu set={setMenu} select={selectMenu} />
        </div>
        <div className="w-full mx-auto flex justify-center items-center">
          <DashboardContainer select={selectMenu} />
        </div>
      </div>
  );
};

export default Dashboard;
