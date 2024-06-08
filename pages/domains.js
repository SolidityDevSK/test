import React from "react";
import CreateDomain from "@/components/Domains/CreateDomain";
import { motion } from "framer-motion";

export default function Domains() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exist={{
        opacity: 0,
      }}
      transition={{
        delay: 0.25,
      }}
    >
      <CreateDomain />
    </motion.div>
  );
}
