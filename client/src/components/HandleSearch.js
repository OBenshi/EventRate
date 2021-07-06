// import React, { useEffect, useState } from "react";
import { useSearch } from "../Contexts/SearchContext";
import { useParty } from "../Contexts/PartyContext";
export default function HandleSearch() {
  const { searchTerm, setSearchTerm } = useSearch();
  // setSearchTerm(string);
  console.log(`searchTerm`, searchTerm);
  // console.log(`string`, string);
}
