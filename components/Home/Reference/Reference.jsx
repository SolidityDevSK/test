import Image from "next/image";
import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import { TransactionContext } from "@/context/TransactionProvider";
import Skeleton from "@/components/Layout/Skeleton/Skeleton";

const settings = {
  infinite: true,
  speed: 50,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  cssEase: "linear",
  autoplaySpeed: 999000,
  pauseOnHover: true,
};

const images = [
  "/binance.svg",
  "/coinbase.svg",
  "/MetaMask.png",
  "/ftxpro.svg",
  "/binance.svg",
  "/coinbase.svg",
  "/MetaMask.png",
  "/ftxpro.svg",
];

const Reference = () => {
  const { animationEnd } = useContext(TransactionContext)
  return (
    <div>
      {animationEnd ? (<div>
        <div className="mt-24 relative">
        <h2 className="font-extrabold mb-20 text-white text-center md:text-2xl text-xl">
          Our <span className="text-primary">Collaborations</span>
        </h2>
      </div>
      <div className="flex">
        <Marquee {...settings}>
          {images.map((img, index) => (
            <div className="h-full overflow-hidden flex" key={index}>
              <div className="my-auto md:ml-40 ml-20 transition-all ease-linear delay-100 hover:scale-90 cursor-pointer border border-primary md:h-[70px] md:w-[70px] h-[50px] w-[50px] flex rounded-lg shadow-primary/50 shadow-inner">
                <Image
                  className="m-auto md:w-[50px] md:h-[50px] w-[30px] h-[30px] transition-all ease-linear animate-pulse"
                  key={index}
                  src={img}
                  alt="Privapp"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
        </div> ):(
          <Skeleton width={400} height={250} />
         )}
   
    </div>
  );
};

export default Reference;
