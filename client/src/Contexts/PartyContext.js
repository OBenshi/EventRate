import { set } from "date-fns/esm";
import React, { useState, useEffect, useContext } from "react";

const PartyContext = React.createContext();

export const useParty = () => useContext(PartyContext);

export function PartyProvider({ children }) {
  const [refresh, setRefresh] = useState(false);
  const [djs, setDjs] = useState([]);
  const [musicalGenres, setMusicalGenres] = useState([]);
  const [parties, setParties] = useState([]);
  const [partyToEdit, setPartyToEdit] = useState(null);

  useEffect(() => {}, []);
  const value = {
    refresh,
    setRefresh,
    djs,
    setDjs,
    musicalGenres,
    setMusicalGenres,
    parties,
    setParties,
    partyToEdit,
    setPartyToEdit,
  };
  return (
    <PartyContext.Provider value={value}>{children}</PartyContext.Provider>
  );
}
