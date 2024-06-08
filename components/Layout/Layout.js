import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Head from "next/head";
import BackToTop from "../utils/BackToTop";

import { Cabin } from "next/font/google";
import { cn } from "@/lib/utils";

const raleway = Cabin({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Privapp - Nft Marketplace</title>
        <meta name="description" content="Privapp - Nft Marketplace" />
      </Head>
      <main className={cn(raleway.className)}>
        <Header />
        {children}
        <BackToTop />
        <Footer />
      </main>
    </>
  );
}
