import { set } from "date-fns/esm";
import React, { useState, useEffect, useContext } from "react";
import {
  NavLink,
  Link,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { useParty } from "./PartyContext";

const SearchContext = React.createContext();

export const useSearch = () => useContext(SearchContext);
export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { parties, setParties, refresh, setRefresh } = useParty();
  const handleSearch = (string) => {
    setSearchTerm(string);
    // console.log(`string`, string);
    // console.log(`searchTerm`, searchTerm);
    // setParties(
    //   parties.filter((party) =>
    //     party.name.toUpperCase().includes(searchTerm.toUpperCase())
    //   )
    // );
    // window.location.reload();

    // setRefresh(!refresh);
  };
  useEffect(() => {
    // handleSearch();
  }, []);
  const value = { searchTerm, setSearchTerm, handleSearch };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
