import { disconnect } from "@wagmi/core";
import { LogOut, User, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePrivappContractWrite } from "@/hooks";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "@/context/TransactionProvider";
import { useAccount } from "wagmi";
import Skeleton from "@/components/Layout/Skeleton/Skeleton";

const Profile = () => {
  const { setWalletAddress,animationEnd } = useContext(TransactionContext);
  const [login, setLogin] = useState(false)
  const { address, isConnected } = useAccount()

  useEffect(() => {
    setLogin(address ? true : false)
  }, [isConnected])
  const { data, write } = usePrivappContractWrite("token");

  const faucetPrivappToken = () => {
    write({
      args: [address, "100000000000000"],
      functionName: "mint",
    });
  };

  const disconnectWallet = async () => {
    await disconnect();
    setWalletAddress("");
  };

  return (
    <div className="hidden md:flex relative mr-5 items-center">
      {animationEnd ? ( <div className={`${login ? "visible" : "hidden"}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <User className="h-8 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard">
                <DropdownMenuItem>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span
                  onClick={() => {
                    faucetPrivappToken();
                  }}
                >
                  Get Test Token
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => disconnectWallet()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>):<Skeleton width={10} height={10}/>}
     
    </div>
  );
};

export default Profile;
