import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";

import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

// RainBowKit Import

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc, sepolia } from "wagmi/chains";
import { TransactionProvider } from "@/context/TransactionProvider";
import { publicProvider } from 'wagmi/providers/public'

import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
//RainBowKit Configure


const { chains, publicClient } = configureChains(
  [bsc],
  [publicProvider()]
  // [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_AlCHEMY_API_KEY })]
);

const { connectors } = getDefaultWallets({
  appName: "Privapp Network NFT Marketplace",
  projectId: "ca13d5fdf6f44f0170f7022191686c8f",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} locale="en-US">
          <TransactionProvider>
              <AnimatePresence mode="wait">
                <motion.div key={router.pathname}>
                  <Layout>
                    <ToastContainer position="top-center" style={{ fontSize: "14px", zIndex: 1000 }}
                      autoClose={2000} />
                    <SkeletonTheme baseColor="#F2F2F2" highlightColor="#FBBD1A">
                      <Component {...pageProps} />
                    </SkeletonTheme>
                  </Layout>
                </motion.div>
              </AnimatePresence>
          </TransactionProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
