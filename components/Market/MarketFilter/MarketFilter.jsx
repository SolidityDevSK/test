

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";


export default function Example({inputValue, setInputValue}) {

  return (
    <div className="bg-background flex flex-col justify-between">
      <div>
        <div className="container mx-auto mt-20">
          <div className="flex text-white items-center justify-center gap-y-2 gap-x-4 w-full">
            <Input
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
              placeholder="Search NFT, Domain..."
              className="w-2/3 md:w-1/2"
            />
            <Button className="w-14 md:w-auto">
              <Search className="w-12 md:w-auto" />
            </Button>
          </div>
        </div>
      </div>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium sr-only text-white"
        >
          Search
        </label>
      </form>


    </div>
  );
}
