import { set } from "date-fns/esm";
import React, { useState, useEffect, useContext } from "react";
import {
  NavLink,
  Link,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isUser, setIsUser] = useState(false);
  // const token = localStorage.getItem("token");
  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);

    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };
  const token = getWithExpiry("token");
  const getUserInfo = async () => {
    if (token !== null) {
      console.log(token !== null, userInfo);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      fetch("http://localhost:5000/users/profile", config)
        .then((res) => res.json())
        .then((data) => {
          console.log("I'm data from AuthContext", data[0]);
          setUserInfo(data[0]);
          //setIsUser(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const setWithExpiry = (key, tokenValue, ttl) => {
    const now = new Date();
    const item = {
      value: tokenValue,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const isUserLoggedIn = () => {
    if (token !== null) {
      setIsUser(true);
    }
  };

  useEffect(() => {
    getUserInfo();
    isUserLoggedIn();
  }, [token]);
  const value = {
    token,
    userInfo,
    setUserInfo,
    isUser,
    setIsUser,
    setWithExpiry,
    getWithExpiry,
    getUserInfo,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
