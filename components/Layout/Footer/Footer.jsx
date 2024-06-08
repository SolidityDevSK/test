import Link from "next/link";
import React from "react";


import {
  RiInstagramLine,
  RiTwitterXLine,
  RiYoutubeLine,
  RiGithubLine,
  RiMailAddLine,
  RiMailFill,
  RiTelegramFill,
  RiRedditFill,
  RiMediumFill,
  RiDiscordFill,
  RiLinkedinFill,
} from "react-icons/ri";

const socials = [
  {
    href:"mailto:info@privapp.network",
    icon: <RiMailFill />
  },
  {
    href: "https://www.instagram.com/privappnetwork/",
    icon: <RiInstagramLine />,
  },
  {
    href: "https://github.com/PrivappNetwork/",
    icon: <RiGithubLine />,
  },
  {
    href: "https://twitter.com/PrivappNetwork/",
    icon: <RiTwitterXLine />,
  },
  {
    href: "https://www.youtube.com/channel/UCvTrYGLsL2It6pLrxP0ip3Q",
    icon: <RiYoutubeLine />,
  },
  {
    href:"https://t.me/PrivappNetwork",
    icon: <RiTelegramFill />
  },
  {
    href:"https://www.reddit.com/r/Privapp_Network/",
    icon: <RiRedditFill />
  },
  {
    href:"https://medium.com/@privappnetwork",
    icon: <RiMediumFill />
  },
  {
    href:"https://www.linkedin.com/company/privapp-network/",
    icon: <RiLinkedinFill />
  },
  {
    href:"https://discord.com/invite/fepCFhdWeD",
    icon: <RiDiscordFill />
  },

  
  
];

const Footer = () => {
  return (

    <footer className="mt-24 text-white bg-[#f3f9fc08] px-10 max-md:flex flex-col items-center justify-center">
      <div className="flex items-center justify-center border-b-2 p-6 border-neutral-500 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="grid mr-10 grid-cols-10 justify-center items-center">
          {socials.map((social, index) => (
            <Link
              href={social.href}
              className="px-5 text-xl md:col-span-1 md:my-0 my-4 col-span-2 text-white"
              key={index}
              target="_blank"
            >
              {social.icon}
            </Link>
          ))}
          
        </div>
      </div>

      <div className="text-center max-md:mt-5 max-md:pb-20 p-10">
        <span>2020 -2024©  &mdash; </span>
        <a className="font-semibold text-primary" href="#">
          Privapp Network
        </a>
      </div>
    </footer>

  );
};

export default Footer;
