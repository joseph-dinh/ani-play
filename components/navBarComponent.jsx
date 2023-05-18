"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";


const NavBarComponent = () => {
  const [query, setQuery]  = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
    <div className="flex flex-row min-w-full justify-between rounded-md items-center">
      <div className="relative w-full md:w-[50%] lg:w-80">
        <form onSubmit={handleSubmit}>
          <input id="searchBar" className="bg-neutral-800 min-w-full px-4 p-2 rounded-md placeholder-neutral-400 outline-none border border-black focus:transition-colors duration-500 focus:border focus:border-[#00D1FF]" type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search" autoComplete="off"/>
          <button type="submit"><BiSearch className="absolute right-2 bottom-2 w-6 h-6 text-neutral-400 opacity-60"/></button>
        </form>
      </div>
    </div>
  );
};

export default NavBarComponent;