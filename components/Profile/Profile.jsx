import React, { useContext, useState } from "react";
import { ProfileContainer, ProfileHeader, ProfileSubHeader } from ".";
import { TransactionContext } from "@/context/TransactionProvider";

const Profile = () => {
  return (
    <div className="mt-12">
      <div className="lg:mx-24 mx-6">
        <ProfileHeader />
        <ProfileSubHeader />
      </div>
      <div className="lg:mx-24 mx-2 mt-6">
        <ProfileContainer />
      </div>
    </div>
  );
};

export default Profile;
