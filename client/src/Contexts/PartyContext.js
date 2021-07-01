import { set } from "date-fns/esm";
import React, { useState, useEffect, useContext } from "react";

const PartyContext = React.createContext();

export const useParty = () => useContext(PartyContext);

export function PartyProvider({ children }) {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {}, []);
  const value = { refresh, setRefresh };
  return (
    <PartyContext.Provider value={value}>{children}</PartyContext.Provider>
  );
}
