import Link from "next/link";
import { useRouter } from "next/router";

import {
  RiHome5Line,
  RiShoppingBagLine,
  RiFileList3Line,
  RiDashboardLine,
  RiUserLine,
} from "react-icons/ri";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const navigation = [
  { id: 1, name: "Market", href: "/market", icon: <RiShoppingBagLine /> },
  { id: 2, name: "Home", href: "/", icon: <RiHome5Line /> },
  { id: 3, name: "Profile", href: "/profile", icon: <RiUserLine /> },
  { id: 4, name: "Dashboard", href: "/dashboard", icon: <RiDashboardLine /> },
];

const MobileNav = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  return (
    <div className="lg:hidden fixed z-[999] bottom-0 flex items-center justify-between bg-background w-full left-0 right-0 h-16 p-5 shadow-2xl shadow-primary">
      {navigation.map((item) => {
        const isActive = router.pathname === item.href;
        const isHidden = item.id == 3 && !address;

        return (
          <Link
            href={item.href}
            key={item.id}
            className={`flex flex-col items-center justify-center text-2xl ${isActive ? "text-primary" : "text-white"} ${clientReady && isHidden ? "hidden" : ""}`}
          >
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default MobileNav;
