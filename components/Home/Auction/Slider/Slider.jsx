import Card from "@/components/Layout/Card/Card";

import React, { useEffect, useState } from "react";

const Slider =({ onSaleNFTs}) => {

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-2 place-content-center place-items-center mt-10">
    {onSaleNFTs && onSaleNFTs.map((item, key)=>
    <Card domain={item} key={key}/>
    )}
     
    </div>
  );
};

export default Slider;
