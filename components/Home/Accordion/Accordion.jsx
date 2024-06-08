const data = [
  {
    id: "item-1",
    title: "Unstoppable Security",
    content:
      "The privapp Unstoppable Domain Services is a decentralized domain name system that is built on the Ethereum blockchain. This revolutionary system is designed to provide users with a secure and censorship-resistant alternative to traditional domain name systems. The privapp Unstoppable Domain Services is a decentralized domain name system that is built on the Ethereum blockchain. This revolutionary system is designed to provide users with a secure and censorship-resistant alternative to traditional domain name systems.",
  },
  {
    id: "item-2",
    title: "Enhanced Privacy",
    content:
      "PrivApp is committed to maintaining the privacy of users. This is effectively achieved by employing the advanced privacy features inherent in blockchain technology. Blockchain's decentralised nature ensures that users can remain anonymous when using their domains, as data is not stored in a central server that can be compromised. This effectively protects against unauthorized sharing or theft of their information, ensuring the privacy of user data and offering a peace of mind that is absent in traditional domain systems.",
  },
  {
    id: "item-3",
    title: "Censorship Resistance",
    content:
      "An indispensable feature of PrivApp Unstoppable Domain Services is its inherent resistance to censorship. As blockchain-based domain names are not subject to control by any government, organization, or entity, they cannot be stopped or censored. This significant feature is instrumental in preserving users' freedom of expression, allowing information to flow unimpeded, and contributes significantly to the broader goal of internet decentralization.",
  },
  {
    id: "item-4",
    title: "Eternal Ownership",
    content:
      "With PrivApp Unstoppable Domain Services, users are afforded the privilege of eternal ownership of their domain names. This revolutionary feature is facilitated by the unique nature of blockchain technology, which allows domain names to be permanently recorded and maintained on the blockchain. This effectively eliminates the requirement for annual renewal fees often associated with traditional domain name registration services. Users are guaranteed continual and unchanging control over their domain names, establishing a permanent presence in the digital world.",
  },
];

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionComponent = () => {
  return (
    <div className="mt-32 p-0 md:p-20 bg-[#f3f9fc08]">
      <Accordion type="single" collapsible className="container mx-auto">
        <div className="flex items-center text-white justify-center text-base lg:text-2xl font-bold mb-20">
          <h1>
            Why <span className="text-primary">PrivApp</span> Unstoppable{" "}
            <span className="text-primary">Domain </span>
            Services?
          </h1>
        </div>
        {data.map((item, index) => (
          <AccordionItem value={item.id} key={index}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">{item.content}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AccordionComponent;
